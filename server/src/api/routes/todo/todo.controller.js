import { StatusCodes } from "http-status-codes";
import Todo from "../../models/todo.model.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(StatusCodes.OK).json(todos);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    const response = {
      message: "Todo created successfully",
      todo: { title: todo.title, _id: todo._id },
    };
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.status(StatusCodes.OK).send(todo);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to retrive todo with id:" +
        req.params.todoId,
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(todo);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.status(StatusCodes.OK).send({
      message: `Todo: ${todo.title}, deleted successfully!`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to delete Todo with id:" +
        req.params.todoId,
      error: error.message,
    });
  }
};

export { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
