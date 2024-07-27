import CURP from "curp";

export function generateCURP(obj) {
  const date = new Date(obj.fechaNacimiento);
  const formatDate = (date) => {
    const dateValueCorrection = parseInt(1, 10);
    //en App Engine Produccion, no sumar nada en el día valor = 0
    //en ambiente local sumar 1. para que funcione.
    //let formatted_date = date.getDate() + "-" + (date.getMonth()+ 1) + "-" + date.getFullYear()

    let formatted_date =
      date.getDate() +
      dateValueCorrection +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return formatted_date;
  };
  const fecha = formatDate(date);
  const gender = obj.genero;
  const estado = obj.estado;
  let persona = CURP.getPersona();
  persona.nombre = obj.nombre;
  persona.apellidoPaterno = obj.a_paterno;
  persona.apellidoMaterno = obj.a_materno;
  persona.genero = CURP.GENERO[gender];
  //Formato: FEMENINO o MASCULINO
  persona.fechaNacimiento = fecha;
  //Formato '22-03-1970';
  persona.estado = CURP.ESTADO[estado];
  const string = CURP.generar(persona);
  return string;
}

export const validateCURP = (data) => CURP.validar(data);

export function errorCurp(req, res, next) {
  res.status(400).json({
    message: "Curp no valida",
  });
}

export function compareDigitVerifyCurp(userCURP, createCURP) {
  const userArray = userCURP.split("", 16);
  const createArray = createCURP.split("", 16);
  const newUserCurp = userArray.join("");
  const newCreateCurp = createArray.join("");
  const res = newUserCurp === newCreateCurp ? true : false;
  return res;
}

export const gender = (param) => param === "MASCULINO" ? "HOMBRE" : "MUJER";
//Cambiar de MASCULINO/FEMENINO a HOMBRE/MUJER, que es el formato que tiene la hoja de calculo.
//La forma MASCULINO/FEMENINO es utlizada por la dependencia de la CURP para validar la información.

export const messageDuplicity = `Lo sentimos, no podemos validar el dígito verificador de tu CURP. 
Por favor acude a la ventanilla del plantel para continuar tu inscripcion. 
Lamentamos los inconvenientes que esto puede causar.`;

export const messageErrorCurp = "Verifica la informacíon";
