import "dotenv/config";

export const config = {
    privateKey: process.env.PRIVATE_KEY_GOOGLE, 
    clientEmail: process.env.CLIENT_EMAIL_GOOGLE,
    idSheet: process.env.ID_SHEET,
    idGoogleRegisterInscription: process.env.ID_SHEET_REGISTER_INSCRIPTION,
    azureStorageConnection: process.env.AZURE_STORAGE_CONNECTION,
    dateForCurp: process.env.DATE_FOR_CURP,
    secret: process.env.SECRET,
}
