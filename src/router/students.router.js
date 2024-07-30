import { Router } from "express";
import {
  dataGeneral,
  dbStudent,
  files,
  inscription,
  typeRegister,
} from "../controller/students.controller.js";
//import { uploadDocs } from "../middleware/multer.js";
import { formDataParser } from "../middleware/formDataParser.js";

const router = Router();
router.get("/typeRegister/:curp", typeRegister);
router.post("/newStudent/dataGeneral",formDataParser, dataGeneral);
router.post("/newStudent/inscription", formDataParser, inscription);
router.post("/DBStudent", formDataParser, dbStudent);
router.post("/files", formDataParser, files);

export default router;
