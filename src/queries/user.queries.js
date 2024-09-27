import { tablesDB } from "../models/tablesDB.model.js";

export const getAllUsersQuery = `SELECT * FROM ${tablesDB.users}`;
export const getUserForEmailQuery = `SELECT * FROM ${tablesDB.users} WHERE email = ?`;
export const createUserDefaultQuery = `INSERT INTO ${tablesDB.users}(email, nameComplete, role, username)
VALUES (?, ?, ?, ?)`;
export const updateUserQuery = `UPDATE ${tablesDB.users} SET role = ? WHERE id = ?`;
export const deleteUserQuery = `DELETE FROM ${tablesDB.users} WHERE id = ?`;