export function questionsModel(rows) {
  const data = [];
  rows.forEach((column) => {
    const register = {
      link: column.get("link"),
      pregunta: column.get("pregunta"),
      respuesta: column.get("respuesta"),
    };
    data.push(register);
  });
  return data;
}
