const express = require("express");

// Controllers
const { createUser, login } = require("../controllers/users.controller");

// Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidator, createUser);

usersRouter.post("/login", login);

module.exports = { usersRouter };
