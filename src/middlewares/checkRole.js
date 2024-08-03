import { unauthorized } from "@hapi/boom";
import { roles } from "../models/tablesDB.model.js";
import { decode } from "./decodeToken.js";

export const checkRole = (req, res, next) => {
  const { role } = decode(req.headers.authorization);
  const access =
    role === roles.admin || role === roles.user || role === roles.sAdmin;
  if (!access) {
    throw unauthorized();
  }
  next();
};
