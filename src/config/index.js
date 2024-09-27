// import "dotenv/config";

export const config = {
  privateKey: process.env.PRIVATE_KEY_GOOGLE,
  clientEmail: process.env.CLIENT_EMAIL_GOOGLE,
  idSheet: process.env.ID_SHEET,
  idGoogleRegisterInscription: process.env.ID_SHEET_REGISTER_INSCRIPTION,
  azureStorageConnection: process.env.AZURE_STORAGE_CONNECTION,
  dateForCurp: process.env.DATE_FOR_CURP,
  secret: process.env.SECRET,
  // DB
  hostDB: process.env.HOST_DB,
  userDB: process.env.USER_DB,
  passDB: process.env.PASS_DB,
  portDB: process.env.PORT_DB,
  nameDB: process.env.NAME_DB,

  //Azure Entra ID
  tenantID: process.env.TENANT_ID,
  clientID: process.env.CLIENT_ID,
  tenantName: process.env.TENANT_NAME,
};
