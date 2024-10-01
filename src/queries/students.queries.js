export const typeRegisterQuery = (curp) => {
  return `
    SELECT 
    estudiantes.curp, 
    estudiantes.apellido_paterno AS a_paterno, 
    estudiantes.apellido_materno AS a_materno, 
    estudiantes.nombre, 
    estudiantes.email, 
    estudiantes.telefono, 
    estudiantes.updatedAt,
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

export const getStudentNumberControlQuery = (numberControl) => {
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
        FROM matriculas
        JOIN estudiantes ON estudiantes.matricula_id = matriculas.id
        JOIN domicilios ON domicilios.id = estudiantes.domicilio_id
        WHERE matriculas.numero_matricula = ${numberControl};
    `;
};

export const getVoucherStudent = (curp, kind) => {
  return `
    SELECT ${kind === 'estudios' ? 'escolaridad_comprobante' : 'acta_nacimiento'} AS name
    FROM estudiantes WHERE curp = '${curp}';
  `;
};

export const getVoucherAddress = (curp) => {
  return `
    SELECT domicilios.comprobante_domicilio AS name
    FROM estudiantes 
    JOIN domicilios ON domicilios.id = estudiantes.domicilio_id
    WHERE curp = '${curp}';
  `;
};
