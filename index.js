import { http } from "@google-cloud/functions-framework";
import express from "express";
import { routerAPI } from "./src/router.js";
import { cors } from "./src/middleware/cors.js";

const app = express();
app.use(cors);
app.use(express.json());
routerAPI(app);

http("frontendC13", app);
