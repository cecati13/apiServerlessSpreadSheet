import { http } from "@google-cloud/functions-framework";
import express from "express";
//import statusMonitor from "express-status-monitor";
import cookieParser from "cookie-parser";
import passport from "passport";

import { authStrategy } from "./src/auth/index.js";
import { routerAPI } from "./src/router/router.js";
import { cors, boomErrorHandler, errorHandler, logErrors } from "./src/middlewares/index.js";

const app = express();
//app.use(statusMonitor())
app.use(cors);
app.use(cookieParser());
app.use(passport.initialize());
authStrategy();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerAPI(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

http("APIv3", app);
