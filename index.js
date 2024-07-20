import { http } from "@google-cloud/functions-framework";
import express from "express";
import { routerAPI } from "./src/router.js";

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.

const app = express();
app.use(express.json());
routerAPI(app);

http("frontendC13", app);
