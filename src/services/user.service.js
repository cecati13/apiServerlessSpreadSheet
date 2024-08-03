import { internal } from "@hapi/boom";
import { database } from "../database/mysql.js";
import { roles } from "../models/tablesDB.model.js";
import {
  createUserDefaultQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserForEmailQuery,
  updateUserQuery,
} from "../queries/userQueries.js";

export const findUsers = async () => {
  try {
    const [results] = await (await database).execute(getAllUsersQuery);
    return results;
  } catch (error) {
    throw internal(error);
  }
};

export const findOneUser = async (username) => {
  try {
    const [results] = await (
      await database
    ).execute(getUserForEmailQuery, [username]);
    if (results.length === 1) {
      const { id, email, nameComplete, role, username } = results[0];
      return { id, email, nameComplete, role, username };
    }
    return false;
  } catch (error) {
    throw internal(error);
  }
};

export const addUserDefault = async (body) => {
  try {
    const { upn: email, name: nameComplete, given_name: username } = body;
    const [result] = await (
      await database
    ).execute(createUserDefaultQuery, [
      email,
      nameComplete,
      roles.notFunctions,
      username,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw internal(error);
  }
};

export const updateUser = async (id, role) => {
  try {
    const [result] = await (
      await database
    ).execute(updateUserQuery, [role, id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw internal(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const [result] = await (await database).execute(deleteUserQuery, [id]);
    return result;
  } catch (error) {
    throw internal(error);
  }
};
