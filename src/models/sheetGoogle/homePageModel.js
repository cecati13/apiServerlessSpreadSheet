export function homePageModel(rows) {
  const data = [];
  rows.forEach((column) => {
    const register = {
      titulo: column.get("titulo"),
      informacion: column.get("informacion"),
      notas: column.get("notas"),
      botones: column.get("botones"),
      animacion: column.get("animacion"),
      link: column.get("link"),
    };
    data.push(register);
  });
  return data;
}
