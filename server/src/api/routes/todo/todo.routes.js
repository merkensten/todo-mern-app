import express from "express";
import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
  archiveTodo,
} from "./todo.controller.js";

export const todoRouter = express.Router();

todoRouter.route("/").post(createTodo).get(getAllTodos);
todoRouter.route("/:todoId").get(getTodo).put(updateTodo).delete(deleteTodo);
todoRouter.route("/complete/:todoId").patch(completeTodo);
todoRouter.route("/archive/:todoId").patch(archiveTodo);
