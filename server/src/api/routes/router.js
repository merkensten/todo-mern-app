import express from "express";
import { todoRouter } from "./todo/todo.routes.js";
import { userRouter } from "./user/user.routes.js";

// routers

// Huvudrouter
export const router = express.Router();

// routes
router.use("/todo", todoRouter);
router.use("/user", userRouter);
