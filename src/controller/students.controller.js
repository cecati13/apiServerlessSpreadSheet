import { request, response } from "express";
import Students from "../services/students.service.js";

const service = new Students();

export const typeRegister = async (req = request, res = response) => {
  try {
    const { curp } = req.params;
    const studentCURP = await service.findTypeRegister(curp);
    res.json(studentCURP);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const dataGeneral = async (req = request, res = response) => {
  try {
    const { body } = req;
    const response = service.isCURPValidate(body);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const inscription = async (req = request, res = response) => {
  try {
    const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
    URLs.forEach((item) => {
      const [key] = Object.keys(item);
      const value = { [key]: item[key] };
      req.body = { ...req.body, ...value };
    });
    const dataCompleted = await service.toCompleteInformationBody(req.body);
    const inscriptionData = await service.addInscriptionNewStudent(
      dataCompleted
    );
    res.json(inscriptionData);
  } catch (error) {
    console.log(error);
    console.log("error catch en router NewStudent/inscription");
  }
};

export const dbStudent = async (req = request, res = response) => {
  try {
    console.log(req.files);
    console.log(req.body);
    const { body } = req;
    res.json(body);
    //const update = await service.addInscriptionDBStudent(body);
    //formato respuesta: {status: boolean, update: boolean, matricula: string, fechaRegistro: string}
    //res.json(update);
  } catch (error) {
    console.error(error);
    console.log("error catch en router /DBStudent");
  }
};

export const files = async (req = request, res = response) => {
  try {
    const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
    res.json(URLs);
  } catch (error) {
    console.error(error);
  }
};
