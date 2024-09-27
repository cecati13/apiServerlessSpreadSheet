import { request, response } from "express";
import {
  listBlobsService,
  findBlobUser,
  getFileBlob,
  deleteFileBlob,
  uploadFiPdf,
} from "../services/files.service.js";
import Students from "../services/students.service.js";
import ControlStudents from "../services/controlStudents.service.js";
import { nameContainer } from "../models/containerAzure.js";

const serviceStudents = new Students();
const serviceControlStudents = new ControlStudents();

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

export const getInfoSISAE = async (req = request, res = response, next) => {
  try {
    const { matricula } = req.params;
    if (matricula !== undefined) {
      const students = await serviceControlStudents.getInfoSISAE(matricula);
      res.json({ ...students });
    } else {
      res.json({ msg: "Undefined Values" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTableId = async (req = request, res = response, next) => {
  try {
    const { table } = req.params;
    const { id } = req.query;
    if (table !== undefined && id !== undefined) {
      const statusID = await serviceControlStudents.deleteId(table, id);
      res.json({ statusID });
    } else {
      res.json({ msg: "Undefined Values" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @property {string} req.params.filename - User CURP
 * @property {('estudios'|'domicilio'|'nacimiento')} req.query.type - Type of file you are requesting
 *
 * @returns {void} - return a base64-encoded file.
 */
export const getFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const { type } = req.query;
    const student = await serviceStudents.getVoucher(filename, type);
    if (student === undefined || student.name === null) {
      throw Error("Not Found file");
    }
    const file = await getFileBlob(student.name, nameContainer.proof);
    const typeFile = student.name.split(".")[1];
    res.json({ file, typeFile });
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
