import { Router } from "express";
import {
  dataGeneral,
  dbStudent,
  files,
  inscription,
  typeRegister,
  //nuevaConexion
} from "../controller/students.controller.js";
import { formDataParser } from "../middlewares/index.js";

const router = Router();
router.get("/typeRegister/:curp", typeRegister);
router.post("/newStudent/dataGeneral",formDataParser, dataGeneral);
router.post("/newStudent/inscription", formDataParser, inscription);
router.post("/DBStudent", formDataParser, dbStudent);
router.post("/files", formDataParser, files);
//router.get("/prueba", nuevaConexion)

export default router;
