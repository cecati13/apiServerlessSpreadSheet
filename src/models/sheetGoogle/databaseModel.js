//ubicationColum usada cuando se requiere actualizar la información
function ubicationColumn(key) {
    let column;
    switch (key) {
        case "discapacidad":
            column = "O";
            break;
        case "padecimiento":
            column = "P";
            break;
        case "email":
            column = "Q";
            break;
        case "telefono":
            column = "R";
            break;
        case "calle":
            column = "S";
            break;
        case "colonia":
            column = "T";
            break;
        case "municipio":
            column = "U";
            break;
        case "estado":
            column = "V";
            break;
        case "cp":
            column = "W";
            break;
        case "escolaridad":
            column = "X";
            break;
        case "comprobanteDomicilio":
            column = "Y";
            break;
        case "comprobanteEstudios":
            column = "Z";
            break;
        case "actaNacimiento":
            column = "AA";
            break;
        default:
            //curp
            column = "B";
            break;
    };
    return column;
}

function updateableData(array) {
    //campos marcados en azul en Spreedsheets database
    const newArray = array.filter(key =>
        key === "telefono"
        || key === "email"
        || key === "calle"
        || key === "colonia"
        || key === "municipio"
        || key === "estado"
        || key === "cp"
        || key === "padecimiento"
        || key === "discapacidad"
        || key === "escolaridad"
        || key === "comprobanteDomicilio"
        || key === "comprobanteEstudios"
        || key === "actaNacimiento"
    );
    return newArray;
}

const firstComunUpdate = "O";
const lastColumnUpdate = "AA";
//rango de datos en SpreedSheet que se pueden actualizar

const rangeDateRegister = "A";
//columna donde se actualiza la fecha de registro

export { ubicationColumn, updateableData, firstComunUpdate, lastColumnUpdate, rangeDateRegister };