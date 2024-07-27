import { Router } from "express";
import {
  dataGeneral,
  dbStudent,
  files,
  inscription,
  typeRegister,
} from "../controller/students.controller.js";
import { uploadDocs } from "../middleware/multer.js";

const router = Router();
router.post("/typeRegister", typeRegister);
router.post("/newStudent/dataGeneral", dataGeneral);
router.post("/newStudent/inscription", inscription);
router.post("/DBStudent", dbStudent);
router.post("/files", uploadDocs, files);

export default router;
