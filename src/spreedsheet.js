import { googleAuth } from "./spreedsheetConexion.js";

async function spreedsheetGoogle(sheetName) {
  const doc = googleAuth();
  await doc.loadInfo();
  return doc.sheetsByTitle[sheetName];
}

export const getSpreedSheet = async (sheetName) => {
  try {
    const sheet = await spreedsheetGoogle(sheetName);
    const rows = await sheet.getRows();
    return rows;
  } catch (error) {
    console.log("Error en getSpreedSheat");
  }
};
