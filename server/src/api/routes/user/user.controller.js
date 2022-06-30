// imports
import { StatusCodes } from "http-status-codes";

// internal imports
import User from "../../models/user.model.js";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../../errors/index.js";

// =================================
// createUser, {{URL}}/user/register
// method: POST
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if user already exists
  const userAlredyExists = await User.findOne({ email });

  if (userAlredyExists) {
    throw new BadRequestError("User already exists");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
    },
    token,
  });
};

// =================================
// loginUser, {{URL}}/user/login
// method: POST
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  // Simpel lösning för att dölja lösenordet i user objektet i response
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
  res.send("Login user");
};

// =================================
// getAllUsers, {{URL}}/user/
// method: GET
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new NotFoundError("No users found");
    }
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Error occured while trying to get all users",
      error: error.message,
    });
  }
};

// =================================
// getUser, {{URL}}/user/:userId
// method: GET
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to get user with id:" + req.params.userId,
      error: error.message,
    });
  }
};

// =================================
// updateUser, {{URL}}/user/:userId
// method: PUT
// PROBLEM: Denna funktionen uppdaterar inte lösenordet på rätt sätt.
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if user already exists
  const userAlredyExists = await User.findOne({ email });

  if (userAlredyExists) {
    throw new BadRequestError("User already exists");
  }
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json(user);
};

// =================================
// deleteUser, {{URL}}/user/:userId
// method: DELETE
const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.userId);
    res.status(StatusCodes.OK).send({
      message: `User with email: ${response.email} deleted successfully!`,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to delete user with id:" +
        req.params.userId,
      error: err.message,
    });
  }
};

export { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser };
