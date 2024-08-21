import { request, response } from "express";
import Students from "../services/students.service.js";
import { mergeUrlsAndBody } from "../utils/mergeUrlsAndBody.js";
import { sequelize } from "../libs/sequelize.js";

const service = new Students();

export const typeRegister = async (req = request, res = response, next) => {
  try {
    const { curp } = req.params;
    const studentCURP = await service.findTypeRegister(curp);
    res.json(studentCURP);
  } catch (error) {
    next(error);
  }
};

export const dataGeneral = async (req = request, res = response, next) => {
  try {
    const { body } = req;
    const response = service.isCURPValidate(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const inscription = async (req = request, res = response, next) => {
  try {
    const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
    req.body = mergeUrlsAndBody(URLs, req.body);
    const dataCompleted = await service.toCompleteInformationBody(req.body);
    const inscriptionData = await service.addInscriptionNewStudent(
      dataCompleted
    );
    res.json(inscriptionData);
  } catch (error) {
    next(error);
  }
};

export const dbStudent = async (req = request, res = response, next) => {
  try {
    if (req.files.length > 0) {
      const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
      req.body = mergeUrlsAndBody(URLs, req.body);
    }
    const update = await service.addInscriptionDBStudent(req.body);
    res.json(update);
  } catch (error) {
    next(error);
  }
};

export const files = async (req = request, res = response, next) => {
  try {
    const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
    res.json(URLs);
  } catch (error) {
    next(error);
  }
};

export const nuevaConexion = async (req = request, res = response, next) => {
  try {
    //const query = `SELECT * FROM pruebas`
    const data = await sequelize.query(query)
    res.json(data)
  } catch (error) {
    next(error);
  }
};
