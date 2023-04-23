const { User } = require("../models/user");
const { ctrlWrapper, createError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const userSignup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  if (user) {
    throw createError(409, "Email in use");
  }
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const userLogout = async (req, res) => {
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  res.status(204).json({});
};

const userCurrent = async (req, res) => {
  const { user } = req;
  if (user) {
    await User.findOne(user._id);

    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  }
  return res.status(401).json({ message: "Not authorized" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    message: users,
  });
};

module.exports = {
  userSignup: ctrlWrapper(userSignup),
  getAllUsers: ctrlWrapper(getAllUsers),
  userLogin: ctrlWrapper(userLogin),
  userLogout: ctrlWrapper(userLogout),
  userCurrent: ctrlWrapper(userCurrent),
};
