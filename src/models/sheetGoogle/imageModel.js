export function imageModel(rows, size) {
  const data = [];
  rows.forEach((column) => {
    const register = {
      nombre: column.get("nombre"),
      imageHigh: column.get("high"),
      imageMedium: column.get("medium"),
      imageSmall: column.get("small"),
      descripcion: column.get("descripcion"),
    };
    data.push(register);
  });
  //validación para regresar solo el tamaño solicitado desde el Frontend
  if (size != undefined) {
    while (size < data.length) {
      data.pop();
    }
  }
  return data;
}
