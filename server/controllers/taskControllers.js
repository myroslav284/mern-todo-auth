import Todo from "../models/Todo.js";

export const getTasksController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) throw new Error("no such todo exists");
    const tasks = todo.tasks;
    res.status(200).json({
      success: true,
      message: "successfully retrieved",
      tasks,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const addTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) throw new Error("no such todo exists");
    todo.tasks.push({ name: req.body.name });
    await todo.save();
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

export const checkUncheckTaskController = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;

    const todo = await Todo.findById(todoId);
    if (!todo) throw new Error("No such todo exists");

    const task = todo.tasks.id(taskId);
    if (!task) throw new Error("No such task exists");

    task.checked = !task.checked; // Toggle the checked property

    await todo.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const editTaskController = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;
    const todo = await Todo.findById(todoId);
    if (!todo) throw new Error("No such todo exists");

    const task = todo.tasks.id(taskId);
    if (!task) throw new Error("No such task exists");

    task.name = req.body.name; // Update the name of the task

    await todo.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteTaskController = async (req, res) => {
    try {
      const { todoId, taskId } = req.params;
      const todo = await Todo.findById(todoId);
      if (!todo) throw new Error("No such todo exists");
  
      const taskIndex = todo.tasks.findIndex((task) => task._id.toString() === taskId);
      if (taskIndex === -1) throw new Error("No such task exists");
  
      todo.tasks.splice(taskIndex, 1); // Remove the task from the tasks array
  
      await todo.save();
  
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        todo,
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
  
  