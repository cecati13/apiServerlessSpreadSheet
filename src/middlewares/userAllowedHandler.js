import { unauthorized } from "@hapi/boom";
import { findOneUser, addUserDefault } from "../services/user.service.js";

export const userAllowedHandler = async (req, res, next) => {
  try {
    const { upn: username } = req.body;
    let user = await findOneUser(username);
    if (!user) {
      const addUser = await addUserDefault(req.body);
      addUser === 1 ? (user = await findOneUser(username)) : (user = null);
    }
    req.body = {
      ...req.body,
      ...user,
    };
    next();
  } catch (error) {
    throw unauthorized();
  }
};
