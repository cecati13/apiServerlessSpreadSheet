import { getSpreedSheet } from "../libs/spreedsheet.js";
import { nameSheet } from "../models/namesheet.js";
import {
  coursesModel,
  homePageModel,
  imageModel,
  questionsModel,
} from "../models/sheetGoogle/index.js";

const selectModel = (sheet, rows, size = undefined) => {
  switch (sheet) {
    case nameSheet.sheetCourses:
      return coursesModel(rows);
    case nameSheet.sheetHomePage:
      return homePageModel(rows);
    case nameSheet.sheetImage:
      return imageModel(rows, size);
    case nameSheet.sheetQuestions:
      return questionsModel(rows);
    default:
      return new Error("Not found sheet");
  }
};

export const service = async (sheet, size = undefined) => {
  const rows = await getSpreedSheet(sheet);
  const data = selectModel(sheet, rows, size);
  return { ...data };
};
