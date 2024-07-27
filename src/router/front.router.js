import { Router } from "express";
import { courses, homePage, images, questions } from "../controller/front.controller.js";

const router = Router();

router.get("/courses", courses);
router.get("/homePage", homePage);
router.get("/images", images);
router.get("/questions", questions);

export default router;