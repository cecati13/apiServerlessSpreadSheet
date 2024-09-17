import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "../config/index.js";
import { nameSheet } from "../models/namesheet.js";

const formattedPrivateKey = config.privateKey.replace(/\\n/g, "\n");

const serviceAccountAuth = new JWT({
  email: config.clientEmail,
  key: formattedPrivateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

function GSheetID(name) {
  if (
    name === nameSheet.sheetNumberControl ||
    name === nameSheet.sheetInscriptions
  ) {
    return config.idGoogleRegisterInscription;
  } else {
    return config.idSheet;
  }
}

export const googleAuth = (name) => {
  const idSheet = GSheetID(name);
  return new GoogleSpreadsheet(idSheet, serviceAccountAuth);
};
