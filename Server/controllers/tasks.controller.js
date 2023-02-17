// Models
const { Task } = require("../models/task.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createTask = catchAsync(async (req, res, next) => {
  const { title, description, importance } = req.body;
  const { sessionUser } = req;

  const newTask = await Task.create({
    userId: sessionUser.id,
    title,
    description,
    importance,
  });

  res.status(201).json({
    status: "success",
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const tasks = await Task.findAll({
    where: { userId: sessionUser.id, status: "active" },
  });

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { filter } = req.params;
  const { sessionUser } = req;

  if (filter === "completed") {
    const tasksCompleted = await Task.findAll({
      where: { userId: sessionUser.id, status: "completed" },
    });

    return res.status(200).json({
      status: "success",
      tasksCompleted,
    });
  }

  const tasks = await Task.findAll({
    where: { userId: sessionUser.id, importance: filter, status: "active" },
  });

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  const { title, description, importance } = req.body;

  await task.update({ title, description, importance });

  res.status(204).json({ status: "success" });
});

const cancelTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

const checkedTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id, status: "active" } });

  if (!task) {
    return res.status(404).json({ status: "err", message: "task not found" });
  }

  await task.update({ importance: "completed", status: "completed" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskByStatus,
  updateTask,
  cancelTask,
  checkedTask,
};
