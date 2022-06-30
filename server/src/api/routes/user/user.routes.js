import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} from "./user.controller.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
userRouter.route("/register").post(createUser);
userRouter.route("/login").post(loginUser);
