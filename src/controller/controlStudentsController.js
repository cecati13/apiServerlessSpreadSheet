import { request, response } from "express";
import {
  listBlobsService,
  findBlobUser,
  getFileBlob,
  deleteFileBlob,
  uploadFiPdf,
} from "../services/files.service.js";
import Students from "../services/students.service.js";
import { nameContainer } from "../models/containerAzure.js";

const serviceStudents = new Students();

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
//container = "informacion" or "comprobantes"
export const getListBlobs = async (req = request, res = response, next) => {
  try {
    const { container } = req.params;
    const list = await listBlobsService(container);
    if (req.query.user) {
      const listUser = findBlobUser(list, req.query.user);
      res.json({ message: listUser });
    } else {
      res.json({ message: list });
    }
  } catch (error) {
    next(error);
  }
};

export const getRegistrationRecord = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { user } = req.query;
    if (user) {
      const studentRecord = await serviceStudents.getDataDB(user);
      res.json({ studentRecord });
    } else {
      res.json({ msg: "not User" });
    }
  } catch (error) {
    next(error);
  }
};

export const getFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await getFileBlob(filename, nameContainer.proof);
    res.json(file);
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await deleteFileBlob(filename, nameContainer.proof);
    res.json({ file });
  } catch (error) {
    next(error);
  }
};

export const postFileInf = async (req = request, res = response, next) => {
  try {
    const arrayURL = await uploadFiPdf(req.files, nameContainer.information);
    Promise.all(arrayURL).then((response) => {
      res.json({ message: response });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteFiPdf = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await deleteFileBlob(filename, nameContainer.information);
    res.json({ file });
  } catch (error) {
    next(error);
  }
};
