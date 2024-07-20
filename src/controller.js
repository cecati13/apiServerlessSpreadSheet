import { request, response } from "express";
import { service } from "./service.js";
import { nameSheet } from "./models/namesheet.js";

export const courses = async (req = request, res = response) => {
  try {
    const data = await service(nameSheet.sheetCourses);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const homePage = async (req = request, res = response) => {
  try {
    const data = await service(nameSheet.sheetHomePage);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const images = async (req = request, res = response) => {
  try {
    const { size } = req.query;
    if (size > 0) {
      const data = await service(nameSheet.sheetImage, size);
      res.json(data);
    } else {
      const data = await service(nameSheet.sheetImage);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const questions = async (req = request, res = response) => {
  try {
    const data = await service(nameSheet.sheetQuestions);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
