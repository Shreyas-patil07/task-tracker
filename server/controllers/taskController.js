const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

// Create Task
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// Get All Tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// Get Single Task
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};