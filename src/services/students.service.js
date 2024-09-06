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
const { sheetInscriptions, sheetNumberControl } = nameSheet;
import { nameContainer } from "../models/containerAzure.js";

import { database } from "../database/mysql.js";
import { Estudiantes } from "../database/models/estudiantes.model.js";
import { Domicilios } from "../database/models/domicilios.model.js";
import {
  getStudentQuery,
  getVoucherAddress,
  getVoucherStudent,
  typeRegisterQuery,
} from "../queries/students.queries.js";

import { getSpreedSheet, postSpreedSheet } from "../libs/spreedsheet.js";
import { uploadBlobStorage } from "../libs/blobsAzure.js";
import { areHideCharacters } from "../utils/hideCharacters.js";
import { Matriculas } from "../database/models/matriculas.model.js";
import { getAnnio } from "../utils/getAnnioControlNumber.js";

export default class Students {
  constructor() {}

  async findTypeRegister(stringCurp) {
    if (validateCURP(stringCurp)) {
      return await this.findForCurp(stringCurp.toUpperCase());
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
    const { controlNumber, controlNumberAnnio } =
      await this.generateNumberControl();
    // Conexión futura a Tabla de matriculas.
    const dataCompleted = {
      ...body,
      fechaRegistro: datetime(),
      matricula: controlNumber,
      annio: controlNumberAnnio,
    };
    return dataCompleted;
  }

  async generateNumberControl() {
    const rows = await getSpreedSheet(sheetNumberControl);
    const countRows = rows.length;
    const numberControl = rows[countRows - 1].get("matricula");
    const numberGenerate = parseInt(numberControl, 10) + 1;
    return {
      controlNumber: numberGenerate,
      controlNumberAnnio: getAnnio(numberGenerate),
    };
  }

  async findForCurp(stringCURP) {
    const [results] = await database.query(typeRegisterQuery(stringCURP.toUpperCase()));
    return results[0];
  }

  async addInscriptionNewStudent(infoInscription) {
    this.dbSaveNumberControl(infoInscription);
    const resSave = await this.dbSaveRegister(infoInscription);
    const objUpdate = {
      ...infoInscription,
      numero_matricula: resSave.matricula.numero_matricula,
      fecha_nacimiento: resSave.estudiante.fecha_nacimiento,
      apellido_paterno: resSave.estudiante.apellido_paterno,
      apellido_materno: resSave.estudiante.apellido_materno,
      sexo: resSave.estudiante.sexo,
      municipio_alcaldia: resSave.domicilio.municipio_alcaldia,
      comprobante_domicilio: resSave.domicilio.comprobante_domicilio,
      escolaridad_comprobante: resSave.estudiante.escolaridad_comprobante,
      acta_nacimiento: resSave.estudiante.acta_nacimiento,
    };
    const sucessfullyRegister = this.inscription(objUpdate);
    return sucessfullyRegister;
  }

  async dbSaveNumberControl(obj) {
    const newObj = this.insertSheet(obj, sheetNumberControl);
    await postSpreedSheet(newObj);
  }

  async dbSaveRegister(obj) {
    const matricula = await Matriculas.create(Matriculas.conexionFields(obj));
    const domicilio = await Domicilios.create(Domicilios.conexionFields(obj));
    console.log("matriculas", matricula.id);
    console.log("domicilios", domicilio.id);
    //Create Empleos, Medio-Informacion and Socioeconomico before Estudiantes.
    const estudiante = await Estudiantes.create(
      Estudiantes.conexionFields(obj, matricula, domicilio)
    );
    console.log("estudiantes", estudiante.id);
    return { matricula, domicilio, estudiante };
  }

  async inscription(obj) {
    const newObj = this.insertSheet(
      { ...obj, fechaRegistro: datetime() },
      sheetInscriptions
    );
    await postSpreedSheet(newObj);
    //sucessfulyRegister indica si se hizo el registro en SpreedSheet
    const sucessfullyRegister = this.verifyLastRegistration(obj);
    //mandar correo electronico de confirmación de inscripcion.
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
      matricula: infoInscription.numero_matricula,
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
      const updated = await this.updateDBStudent(body);
      //confirmamos que se actualizo la informacion
      body.update = updated;
    }
    const data = await this.getDataDB(body.curp);
    const newObj = { ...body, ...data };
    const sucessfullyRegister = await this.inscription(newObj);
    return {
      ...sucessfullyRegister,
      //temporal. Hasta el uso de la Tabla Inscripciones
      fechaRegistro: datetime(),
      update: newObj.update,
    };
  }

  async getDataDB(stringCURP) {
    const [results] = await database.query(getStudentQuery(stringCURP.toUpperCase()));
    return results[0];
  }

  async getVoucher(stringCURP, kind) {
    const query =
      kind === "domicilio"
        ? getVoucherAddress(stringCURP.toUpperCase())
        : getVoucherStudent(stringCURP.toUpperCase(), kind);
    const [results] = await database.query(query);
    return results[0];
  }

  async getStudentDB(stringCURP) {
    return await Estudiantes.findOne({
      where: { curp: stringCURP.toUpperCase() },
      attributes: ["domicilio_id"],
    });
  }

  async updateDBStudent(obj) {
    const cleanObj = areHideCharacters(obj);
    const updates = [];
    const updateStudentsValues = {};
    const updateAdressValues = {};
    /**
     * Pendiente generar funciones para separar codigo
     */
    Object.keys(cleanObj).forEach((key) => {
      if (Estudiantes.fieldsUpdateForStudent.includes(key)) {
        updateStudentsValues[key] = cleanObj[key];
      } else if (Domicilios.fieldsUpdateForStudent.includes(key)) {
        updateAdressValues[key] = cleanObj[key];
      }
    });
    /**
     * Falta verificar todos los nombres de los campos que pueden llegar a ser actualizados
     * pendientes los datos de escolaridad
     */
    if (Object.keys(updateStudentsValues).length > 0) {
      const [countStudent] = await Estudiantes.update(updateStudentsValues, {
        where: { curp: cleanObj.curp },
        limit: 1,
        validate: true,
      });
      updates.push(countStudent);
    }

    if (Object.keys(updateAdressValues).length > 0) {
      const { domicilio_id } = await this.getStudentDB(cleanObj.curp);
      const cleanUpdateAddress = this.setNameAddress(
        cleanObj,
        updateAdressValues
      );
      const [countAdress] = await Domicilios.update(cleanUpdateAddress, {
        where: { id: domicilio_id },
        limit: 1,
        validate: true,
        fields: Object.keys(cleanUpdateAddress),
      });
      updates.push(countAdress);
    }
    return {
      updated: updates.every((item) => item === 1),
    };
  }

  setNameAddress(inscriptionData, updatableValues) {
    if (updatableValues.municipio) {
      Object.defineProperty(updatableValues, "municipio_alcaldia", {
        value: inscriptionData.municipio,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    if (updatableValues.comprobanteDomicilio) {
      Object.defineProperty(updatableValues, "comprobante_domicilio", {
        value: inscriptionData.comprobanteDomicilio,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    return updatableValues;
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
      container: nameContainer.proof,
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
