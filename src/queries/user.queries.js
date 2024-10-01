import { tablesDB } from "../models/tablesDB.model.js";

export const getUserForEmailQuery = `SELECT * FROM ${tablesDB.users} WHERE email = ?`;
export const createUserDefaultQuery = `INSERT INTO ${tablesDB.users}(email, nameComplete, role, username, createdAt, updatedAt)
VALUES (?, ?, ?, ?, ?, ?)`;
export const updateUserQuery = `UPDATE ${tablesDB.users} SET role = ? WHERE id = ?`;
export const deleteUserQuery = `DELETE FROM ${tablesDB.users} WHERE id = ?`;
