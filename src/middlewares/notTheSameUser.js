import { methodNotAllowed } from "@hapi/boom";

export const notTheSameUser = (req, res, next) => {
  const { idAdmin } = req.query.information;
  const { id } = req.params;
  if (Number(idAdmin) === Number(id)) {
    throw methodNotAllowed("The same user");
  } else {
    next();
  }
};
