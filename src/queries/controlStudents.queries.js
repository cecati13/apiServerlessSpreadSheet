export const deleteIDQuery = (table, id) => {
  return `DELETE FROM ${table} WHERE id = ${id};`;
};
