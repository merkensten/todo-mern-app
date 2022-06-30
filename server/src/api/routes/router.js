import express from "express";
import { todoRouter } from "./todo/todo.routes.js";

// routers

// Huvudrouter
export const router = express.Router();

// routes
router.use("/todo", todoRouter);
