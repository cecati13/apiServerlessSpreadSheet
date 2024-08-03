import { jwtDecode } from "jwt-decode";
import { passportConfig } from "../config/authConfig.js";
import { unauthorized } from "@hapi/boom";

export const decode = (token) => {
  return jwtDecode(token);
};

export const decodeOauthToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const { upn, name, given_name, family_name } = decode(token);
      req.body = {
        upn,
        name,
        given_name,
        family_name,
      };
    }
    const { upn } = req.body;
    const access =
      upn.includes(passportConfig.credentials.tenantID) &&
      upn.includes(passportConfig.otherValues.tenantName);
    if (access) {
      next();
    } else {
      throw unauthorized();
    }
  } catch (error) {
    next(error);
  }
};
