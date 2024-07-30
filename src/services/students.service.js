import {
  generateCURP,
  compareDigitVerifyCurp,
  messageDuplicity,
  messageErrorCurp,
  validateCURP,
  gender,
} from "../utils/curp.js";
import { datetime } from "../utils/date.js";

import { nameSheet } from "../models/namesheet.js";
const { sheetDatabase, sheetInscriptions, sheetNumberControl } = nameSheet;
import { JSONResponse, JSONgetDB } from "../models/JSONResponse.js";

import {
  getSpreedSheet,
  postSpreedSheet,
  updateSpreedSheet,
} from "../libs/spreedsheet.js";
import { uploadBlobStorage } from "../libs/blobsAzure.js";
import { areHideCharacters } from "../utils/hideCharacters.js";

export default class Students {
  constructor() {}

  async findTypeRegister(stringCurp) {
    if (validateCURP(stringCurp)) {
      return await this.findForCurp(stringCurp);
    } else {
      return { message: "Wrong Structure" };
    }
  }

  isCURPValidate(obj) {
    const createCURP = generateCURP(obj);
    const userCURP = obj.curp;
    //ajustar en middlewares/validateCURP.js formatDate segun ambiente productivo
    if (createCURP === userCURP) {
      return {
        curp: obj.curp,
        nombre: obj.nombre,
        a_paterno: obj.a_paterno,
        a_materno: obj.a_materno,
        placeofBirth: obj.estado,
        gender: gender(obj.genero),
        disability: obj.disability,
        birthdate: obj.fechaNacimiento,
        actaNacimientoRender: obj.actaNacimientoRender,
      };
    } else {
      if (compareDigitVerifyCurp(userCURP, createCURP)) {
        return {
          curp: false,
          datacurp: createCURP,
          message: messageDuplicity,
        };
      } else {
        return {
          curp: false,
          datacurp: createCURP,
          message: messageErrorCurp,
        };
      }
    }
  }

  async toCompleteInformationBody(body) {
    const controlNumber = await this.generateNumberControl();
    const dataCompleted = {
      ...body,
      fechaRegistro: datetime(),
      matricula: controlNumber,
    };
    return dataCompleted;
  }

  async generateNumberControl() {
    const rows = await getSpreedSheet(sheetNumberControl);
    const countRows = rows.length;
    const numberControl = rows[countRows - 1].get("matricula");
    const numberGenerate = parseInt(numberControl, 10) + 1;
    return numberGenerate;
  }

  async findForCurp(stringCURP) {
    const rows = await getSpreedSheet(sheetDatabase);
    const data = rows.filter((column) => {
      const value = column.get("curp").toUpperCase();
      return value.includes(stringCURP);
    });
    return data.length > 0 ? JSONResponse(data) : { error: "CURP" };
  }

  async addInscriptionNewStudent(infoInscription) {
    this.dbSaveNumberControl(infoInscription);
    this.dbSaveRegister(infoInscription);
    const sucessfullyRegister = this.inscription(infoInscription);
    return sucessfullyRegister;
  }

  async dbSaveNumberControl(obj) {
    const newObj = this.insertSheet(obj, sheetNumberControl);
    await postSpreedSheet(newObj);
  }

  async dbSaveRegister(obj) {
    const newObj = this.insertSheet(obj, sheetDatabase);
    await postSpreedSheet(newObj);
  }

  async inscription(obj) {
    const newObj = this.insertSheet(obj, sheetInscriptions);
    await postSpreedSheet(newObj);
    //sucessfulyRegister indica si se hizo el registro en SpreedSheet
    const sucessfullyRegister = this.verifyLastRegistration(obj);
    return sucessfullyRegister;
  }

  insertSheet(obj, nameSheet) {
    return { ...obj, sheet: nameSheet };
  }

  //consultar que ultimo registro en Spreedsheets sea el mismo que registramos
  async verifyLastRegistration(infoInscription) {
    const rows = await getSpreedSheet(sheetInscriptions);
    const countRows = rows.length;
    const lastInscriptionCurp = rows[countRows - 1].get("curp");
    const res = {
      status: lastInscriptionCurp === infoInscription.curp,
      matricula: infoInscription.matricula,
      fechaRegistro: infoInscription.fechaRegistro,
    };
    return res;
  }

  /**
   * 
   * @param {object} body - Contains student information, selected course. "update": boolean (optional), and "indexR" field for the DB
   * @param {boolean} body.update - boolean (optional)
   * @param {string} body.indexR - string. DB SpreedSheet search field   * 
   * @returns {{
   *  status: boolean, 
   *  update: boolean, 
   *  matricula: string, 
   *  fechaRegistro: string
   * }}  - Inscription Completed
   */
  async addInscriptionDBStudent(body) {
    if (body.update) {
      const bodyWithDatetime = {
        ...body,
        fechaRegistro: datetime(),
      };
      const updated = await this.updateDBStudent(bodyWithDatetime);
      //confirmamos que se actualizo la informacion
      body.update = updated.updated;
    }
    delete body.matricula;
    delete body.a_paterno;
    delete body.a_materno;
    delete body.nombre;
    delete body.telefono;
    delete body.email;
    const data = await this.getDataDB(body.curp);
    const newObj = { ...body, ...data, fechaRegistro: datetime() };
    //Reassignmos timestampt  que viene del Registro de BD al actual
    const sucessfullyRegister = await this.inscription(newObj);
    return {
      ...sucessfullyRegister,
      update: newObj.update,
    };
  }

  async getDataDB(stringCURP) {
    const rows = await getSpreedSheet(sheetDatabase);
    const data = rows.filter((column) => {
      const value = column.get("curp").toUpperCase();
      return value.includes(stringCURP);
    });
    return JSONgetDB(data);
  }

  async updateDBStudent(obj) {
    const filterPhoneAndNumber = areHideCharacters(obj);
    const newObj = this.insertSheet(filterPhoneAndNumber, sheetDatabase);
    const updated = await updateSpreedSheet(newObj);
    return {
      updated: updated,
    };
  }
  /**
   *
   * @param {File[]} files - An Array of binary files to be uploaded
   * @param {string} curp - Name of user
   * @returns {Promise<Object[]>} - A promise that resolves to an array of results from the file uploads.
   */
  async uploadStorageDocs(files, curp) {
    return await Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file, curp);
      })
    );
  }

  /**
   *
   * @param {File} file - Binary file to be uploaded
   * @param {string} curp - Name to process file upload
   * @returns {Object} - Contains the original property of the file and the url for the database
   */
  async uploadFile(file, curp) {
    const ext = file.mimetype.split("/")[1];
    const nameFile = `${curp}-${file.fieldname}.${ext}`;
    const objInformationBlob = {
      file: file,
      name: nameFile,
      container: "comprobantes",
    };
    await uploadBlobStorage(objInformationBlob);
    const url = {};
    Object.defineProperty(url, file.fieldname, {
      value: nameFile,
      enumerable: true,
      writable: true,
      configurable: true,
    });
    return url;
  }
}
