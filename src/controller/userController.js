import { request, response } from "express";
import { findUsers, updateUser, deleteUser } from "../services/user.service.js";
import { signToken } from "../auth/signToken.js";

export const changeTokenUser = (req, res, next) => {
  try {
    const { id, email, nameComplete, username, role } = req.body;
    const payload = { id, username, email, nameComplete, role };
    const token = signToken(payload);
    res.cookie("token_jwt", token, {
      httpOnly: true,
      secure: false,
    });
    res.send({ ...payload, token });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req = request, res = response, next) => {
  try {
    const users = await findUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const updateRoleUser = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const { role } = req.query;
    const update = await updateUser(Number(id), role);
    res.send({ update });
  } catch (error) {
    next(error);
  }
};

export const deleteUserFromSystem = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const isDeleteUser = await deleteUser(id);
    res.send({ isDeleteUser });
  } catch (error) {
    next(error);
  }
};
