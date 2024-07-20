import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "./config.js";

const formattedPrivateKey = config.privateKey.replace(/\\n/g,"\n");

const serviceAccountAuth = new JWT({
  email: config.clientEmail,
  key: formattedPrivateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const googleAuth = () =>
  new GoogleSpreadsheet(config.idSheet, serviceAccountAuth);
