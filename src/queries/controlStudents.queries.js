export const deleteIDQuery = (table, id) => {
  return `DELETE FROM ${table} WHERE id = ${id};`;
};

export const getInfoSISAEQuery = (matricula, limit) => {
  return `
    SELECT 
    matriculas.numero_matricula,
    estudiantes.curp,
    estudiantes.apellido_paterno, 
    estudiantes.apellido_materno, 
    estudiantes.nombre, 
    estudiantes.telefono, 
    domicilios.calle, 
    domicilios.colonia, 
    domicilios.municipio_alcaldia, 
    domicilios.estado, 
    domicilios.cp 
    FROM matriculas 
    JOIN estudiantes ON estudiantes.matricula_id = matriculas.id 
    JOIN domicilios ON domicilios.id = estudiantes.domicilio_id 
    WHERE matriculas.numero_matricula >= ${matricula} 
    ORDER BY matriculas.numero_matricula
    LIMIT ${limit};`;
};
