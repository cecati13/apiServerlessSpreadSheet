import { Router } from "express";

export const router = Router();

router.post("/typeRegister", async (req, res) => {
  try {
    const { curp } = req.body;
    const studentCURP = await service.findTypeRegister(curp);
    res.json(studentCURP);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/newStudent/dataGeneral", async (req, res) => {
    try {
      const { body } = req;
      const newStudentCURPValidate = service.isCURPValidate(body);
      res.json(newStudentCURPValidate);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.post("/newStudent/inscription", async (req, res) => {
    try {
      const { body } = req;
      const dataCompleted = await service.toCompleteInformationBody(body);
      //registrar en GSheets preinscripcion
      const inscriptionData = await service.addInscriptionNewStudent(
        dataCompleted
      );
      if (inscriptionData === { error: "Conexion-Spreedsheet" }) {
        res.json(newStudentCURPValidate);
      }
      res.json(inscriptionData);
    } catch (error) {
      console.log(error);
      console.log("error catch en router NewStudent/inscription");
    }
  });
  
  router.post("/DBStudent", async (req, res) => {
    try {
      const { body } = req;
      const update = await service.addInscriptionDBStudent(body);
      //formato respuesta: {status: boolean, update: boolean, matricula: string, fechaRegistro: string}
      res.json(update);
    } catch (error) {
      console.error(error);
      console.log("error catch en router /DBStudent");
    }
  });
  
  router.post("/files", uploadDocs, async (req, res) => {
    try {
      const URLs = await service.uploadStorageDocs(req.files, req.body.curp);
      res.json(URLs);
    } catch (error) {
      console.error(error);
    }
  });