import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(StatusCodes.NOT_FOUND);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    statusCode: statusCode,
    message: error.message,
    stacktrace: process.env.ENVIROMENT === "PRODUCTION" ? null : error.stack,
  });
};

export default {
  notFound,
  errorHandler,
};
