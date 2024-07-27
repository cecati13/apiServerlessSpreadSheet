import { Router } from "express";
import students from "./students.router.js";
import controlStudents from "./controlStudents.router.js";
import { courses, homePage, images, questions } from "../controller.js";

export const routerAPI = (app) => {
  const router = Router();
  app.use(router);
  router.get("/courses", courses);
  router.get("/homePage", homePage);
  router.get("/images", images);
  router.get("/questions", questions);
  router.use("/students", students);
  router.use("/controlStudents", controlStudents);
};
