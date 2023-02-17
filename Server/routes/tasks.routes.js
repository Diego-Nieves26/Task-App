const express = require("express");

// Controllers
const {
  createTask,
  getAllTasks,
  getTaskByStatus,
  updateTask,
  cancelTask,
  checkedTask,
} = require("../controllers/tasks.controller");

// Middlewares
const { createTaskValidator } = require("../middlewares/validators.middleware");
const { protectSession } = require("../middlewares/auth.middleware");
const { taskExists } = require("../middlewares/tasks.middleware");

const tasksRouter = express.Router();

tasksRouter.use(protectSession);

tasksRouter.post("/", createTaskValidator, createTask);

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:filter", getTaskByStatus);

tasksRouter.patch("/checked/:id", checkedTask);

tasksRouter.patch("/:id", taskExists, updateTask);

tasksRouter.delete("/:id", taskExists, cancelTask);

module.exports = { tasksRouter };
