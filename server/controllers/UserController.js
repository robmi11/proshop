import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { genToken } from "../utils/genToken.js";

/**
 * @description   Login user and get the token
 * @route         POST /api/users/login
 * @param -       User e-mail and password
 * @access        Public
 */
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error("Invalid e-mail address and / or password!");
  }
});

/**
 * @description   Register user and get the token
 * @route         POST /api/users
 * @param -       User details
 * @access        Public
 */
export const registerUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User is registered." });
});

/**
 * @description   Logout user and clear cookie
 * @route         POST /api/users/logout
 * @access        Private
 */
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "User is logged out." });
});

/**
 * @description   Get User profile
 * @route         GET /api/users/profile
 * @access        Private
 */
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ _id: req.user._id, name: req.user.name, email: req.user.email });
});

/**
 * @description   Update User profile
 * @route         PUT /api/users/profile
 * @access        Private
 */
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

/**
 * @description   Get all users profiles
 * @route         GET /api/users/profile
 * @access        Private / Admin
 */
export const getAllUsersProfile = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "All user profile" });
});

/**
 * @description   Get user profile by ID
 * @route         GET /api/users/:id
 * @access        Private / Admin
 */
export const getUsersProfileById = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User profile by Id" });
});

/**
 * @description   Delete user
 * @route         POST /api/users/:id
 * @access        Private / Admin
 */
export const deleteUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User is deleted." });
});

/**
 * @description   Update user profile by Admin
 * @route         PUT /api/users/:id
 * @access        Private / Admin
 */
export const updateUserByAdmin = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User is updated by Admin." });
});
