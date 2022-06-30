// imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import 'express-async-errors';

// Config
import Config from "./config/config.js";

// Middlewares
import middlewares from "./api/middlewares/Middlewares.js";

// router
import { router } from "./api/routes/router.js";

const app = express();

if (process.env.ENVIRONMENT === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

// router
app.use("/api/v1", router);

// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const start = () => {
  try {
    Config.connectToDB();
    Config.connectToPort(app);
  } catch (error) {
    console.log(error);
  }
};

start();
