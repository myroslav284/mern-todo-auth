import Todo from "../models/Todo.js";

export const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.user_id });
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      todos,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const createTodoController = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user not found and you are not allowed");
    }
    const { title } = req.body;
    if (!title) throw new Error("title can't be empty");

    const todo = await Todo.create({
      title,
      user: user.user_id,
    });
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const editTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("no such todo exist");
    }
    todo.title = title;
    const editTodo = await Todo.findByIdAndUpdate(id, todo);
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      editedTodo: todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("no such todo exist");
    }
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      deletedTodo: deletedTodo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const searchTodoController = async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);
    const todos = await Todo.find({
      $or: [
        {
          $and: [
            { title: new RegExp(search, "i") },
            { user: req.user.user_id },
          ],
        },
        {
          $and: [
            { "tasks.name": new RegExp(search, "i") },
            { user: req.user.user_id },
          ],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      todos,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
