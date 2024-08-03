import { googleAuth } from "./spreedsheetConexion.js";
import {
  firstComunUpdate,
  lastColumnUpdate,
  rangeDateRegister,
  updateableData,
  ubicationColumn,
} from "../models/sheetGoogle/databaseModel.js";

async function spreedsheetGoogle(sheetName) {
  const doc = googleAuth(sheetName);
  await doc.loadInfo();
  return doc.sheetsByTitle[sheetName];
}

export const getSpreedSheet = async (sheetName) => {
  try {
    const sheet = await spreedsheetGoogle(sheetName);
    return await sheet.getRows();
  } catch (error) {
    console.log(error)
  }
};

//metodos al usar DB Spreadsheet
export const postSpreedSheet = async (objInscription) => {
  const sheet = await spreedsheetGoogle(objInscription.sheet);
  await sheet.addRow(objInscription);
};

export const updateSpreedSheet = async (objUpdate) => {
  try {
    const sheet = await spreedsheetGoogle(objUpdate.sheet);
    const index = objUpdate.indexR;
    await sheet.loadCells(
      `${firstComunUpdate}${index}:${lastColumnUpdate}${index}`
    );
    let nameColumnsArray = countDataUpdate(objUpdate);
    while (nameColumnsArray.length > 0) {
      const column = ubicationColumn(nameColumnsArray[0]);
      const dataUpdate = sheet.getCellByA1(`${column}${index}`);
      dataUpdate.value = objUpdate[nameColumnsArray[0]];
      nameColumnsArray.shift();
    }
    await sheet.saveUpdatedCells();

    await sheet.loadCells(`${rangeDateRegister}${index}`); //rango de Fecha de Registro
    const dateUpdateRegister = sheet.getCellByA1(
      `${rangeDateRegister}${index}`
    );
    dateUpdateRegister.value = objUpdate.fechaRegistro;
    await sheet.saveUpdatedCells();

    return true;
  } catch (error) {
    console.log("Error en updateSpreedSheat");
    return false;
  }
};
//metodos al usar DB Spreadsheet

function countDataUpdate(obj) {
  const keys = Object.keys(obj);
  const columnsUpdateable = updateableData(keys);
  return columnsUpdateable;
}
