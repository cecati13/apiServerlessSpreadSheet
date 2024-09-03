import { database } from "../database/mysql.js";
import { deleteIDQuery } from "../queries/controlStudents.queries.js";

export default class ControlStudents {
  constructor() {}

  async deleteId(table, id) {
    const [response] = await database.query(deleteIDQuery(table, id));
    return response.affectedRows;
  }
}
