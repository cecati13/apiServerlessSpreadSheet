import { unauthorized } from "@hapi/boom";
import { roles } from "../models/tablesDB.model.js";
import { decode } from "./decodeToken.js";

export const checkRoleAdmin = (req, res, next) => {
  const { role, id } = decode(req.headers.authorization);
  if (role === roles.admin || role === roles.sAdmin) {
    req.query.information = { role, idAdmin: id };
    next();
  } else {
    throw unauthorized();
  }
};
