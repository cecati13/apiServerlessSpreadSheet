import { createPool } from "mysql2/promise";
import { config } from "../config/index.js";

export const database = createPool({
  host: config.hostDB,
  user: config.userDB,
  password: config.passDB,
  port: config.portDB,
  database: config.nameDB,
  waitForConnections: true,
  connectionLimit: 5,
});
