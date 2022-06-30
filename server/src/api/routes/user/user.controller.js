import { StatusCodes } from "http-status-codes";

// createUser, {{URL}}/user/register
// method: POST
const createUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "User created successfully",
  });
};

// loginUser, {{URL}}/user/login
// method: POST
const loginUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "User loggedin successfully",
  });
};

// getAllUsers, {{URL}}/user/
// method: GET
const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Get All Users",
  });
};

// getUser, {{URL}}/user/:userId
// method: GET
const getUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Get User With id",
  });
};

// updateUser, {{URL}}/user/:userId
// method: PUT
const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Update user",
  });
};

// deleteUser, {{URL}}/user/:userId
// method: DELETE
const deleteUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Delete user",
  });
};

export { getAllUsers, createUser, getUser, updateUser, deleteUser, loginUser };
