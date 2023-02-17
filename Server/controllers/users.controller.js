const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new AppError("Credentials invalid", 404));
  }

  const isPasswordaValid = await bcrypt.compare(password, user.password);

  if (!isPasswordaValid) {
    return next(new AppError("Credentials invalid", 404));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  res.status(201).json({
    status: "success",
    token,
    name: user.name,
  });
});

module.exports = {
  createUser,
  login,
};
