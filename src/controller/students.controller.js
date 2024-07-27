import { request } from "express";
import Students from "../services/students.service.js";

const service = new Students();

export const typeRegister = async (req, res) => {
  try {
    const { curp } = req.body;
    const studentCURP = await service.findTypeRegister(curp);
    res.json(studentCURP);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const dataGeneral = async (req, res) => {
  try {
    const { body } = req;
    const response = service.isCURPValidate(body);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const inscription = async (req, res) => {
  try {
    const { body } = req;
    console.log(req.files);
    const dataCompleted = await service.toCompleteInformationBody(body);
    const inscriptionData = await service.addInscriptionNewStudent(
      dataCompleted
    );
    res.json(inscriptionData);
  } catch (error) {
    console.log(error);
    console.log("error catch en router NewStudent/inscription");
  }
};

export const dbStudent = async (req, res) => {
  try {
    const { body } = req;
    const update = await service.addInscriptionDBStudent(body);
    //formato respuesta: {status: boolean, update: boolean, matricula: string, fechaRegistro: string}
    res.json(update);
  } catch (error) {
    console.error(error);
    console.log("error catch en router /DBStudent");
  }
};

export const files = async (req = request, res) => {
  try {
    console.log("-------------------");
    console.log(req.file);
    console.log(req.files);
    console.log("??????????");
    console.log(req.body);
    res.json({...req.body, ...req.files});
    //const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
    //res.json(URLs);
  } catch (error) {
    console.error(error);
  }
};
