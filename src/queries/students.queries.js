export const typeRegisterQuery = (curp) => {
  return `
    SELECT 
    estudiantes.curp, 
    estudiantes.apellido_paterno AS a_paterno, 
    estudiantes.apellido_materno AS a_materno, 
    estudiantes.nombre, 
    estudiantes.email, 
    estudiantes.telefono, 
    matriculas.numero_matricula AS matricula
    FROM estudiantes
    JOIN matriculas ON matriculas.id = estudiantes.matricula_id
    WHERE estudiantes.curp = "${curp}";
    `;
};

export const getStudentQuery = (curp) => {
  return `
        SELECT 
        estudiantes.*,
        matriculas.numero_matricula,
        domicilios.calle,
        domicilios.colonia,
        domicilios.municipio_alcaldia,
        domicilios.cp,
        domicilios.estado,
        domicilios.comprobante_domicilio
        FROM estudiantes
        JOIN matriculas ON matriculas.id = estudiantes.matricula_id
        JOIN domicilios ON domicilios.id = estudiantes.domicilio_id
        WHERE estudiantes.curp = "${curp}";
    `;
};
