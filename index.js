import { http } from "@google-cloud/functions-framework";
import express from "express";
import statusMonitor from "express-status-monitor";
import { routerAPI } from "./src/router/router.js";
import { cors } from "./src/middleware/cors.js";
import { boomErrorHandler, errorHandler, logErrors } from "./src/middleware/errorHandler.js";

const app = express();
app.use(statusMonitor())
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerAPI(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

http("frontendC13", app);
