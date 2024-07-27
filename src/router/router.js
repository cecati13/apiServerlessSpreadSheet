import { Router } from "express";

import students from "./students.router.js";
import front from "./front.router.js";
//import controlStudents from "./controlStudents.router.js";

export const routerAPI = (app) => {
  const router = Router();
  app.use(router);
  router.use("/", front);
  router.use("/students", students);
  //router.use("/controlStudents", controlStudents);
};
