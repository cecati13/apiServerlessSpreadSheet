import { hideCharactersEmail, hideCharactersPhone } from "./../utils/hideCharacters.js";

export function JSONResponse(dataArray) {
    const date = dataArray[0].get('fechaRegistro');
    //Si date es undefined, los datos son previos a este sistema de inscripciones, y obligamos a actualizar info.
    if (date) {
        const telefonoEncrypted = hideCharactersPhone(dataArray[0].get('telefono'));
        const emailEncrypted = hideCharactersEmail(dataArray[0].get('email'));
        return {
            curp: dataArray[0].get('curp'),
            matricula: dataArray[0].get('matricula'),
            a_paterno: dataArray[0].get('a_paterno'),
            a_materno: dataArray[0].get('a_materno'),
            nombre: dataArray[0].get('nombre'),
            telefono: telefonoEncrypted,
            email: emailEncrypted,
            indexR: dataArray[0].rowNumber,
        }
    } else {
       return {
            curp: dataArray[0].get('curp'),
            matricula: dataArray[0].get('matricula'),
            a_paterno: dataArray[0].get('a_paterno'),
            a_materno: dataArray[0].get('a_materno'),
            nombre: dataArray[0].get('nombre'),
            updateContact: true,
            indexR: dataArray[0].rowNumber,
        }
    }   
}

export function JSONgetDB(dataArray) {
    const info = {
        fechaRegistro: dataArray[0].get('fechaRegistro'),
        curp: dataArray[0].get('curp'),
        matricula: dataArray[0].get('matricula'),
        a_paterno: dataArray[0].get('a_paterno'),
        a_materno: dataArray[0].get('a_materno'),
        nombre: dataArray[0].get('nombre'),
        genero: dataArray[0].get('genero'),
        fechaNacimiento: dataArray[0].get('fechaNacimiento'),
        email: dataArray[0].get('email'),
        telefono: dataArray[0].get('telefono'),
        calle: dataArray[0].get('calle'),
        colonia: dataArray[0].get('colonia'),
        municipio: dataArray[0].get('municipio'),
        estado: dataArray[0].get('estado'),
        cp: dataArray[0].get('cp'),
        discapacidad: dataArray[0].get('discapacidad'),
        escolaridad: dataArray[0].get('escolaridad'),
        comprobanteDomicilio: dataArray[0].get('comprobanteDomicilio'),
        comprobanteEstudios: dataArray[0].get('comprobanteEstudios'),
        actaNacimiento: dataArray[0].get('actaNacimiento'),
    }
    return info;
}