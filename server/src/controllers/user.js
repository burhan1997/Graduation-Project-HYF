import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET;
// Function that converts the given string id to ObjectId

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(user)}`,
      });
      return;
    }

    const errorList = validateUser(user);
    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }
    // Check if user already exists
    let existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create new user document
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    // Save the user to MongoDB
    await newUser.save();

    // Create JWT token synchronously
    if (!JWT_SECRET_KEY) {
      logError("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ user: { id: newUser._id } }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    // Return success response with token
    res.status(201).json({ success: true, token });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Fetch all users from MongoDB
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to fetch users, try again later" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, msg: "Token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ success: false, msg: "Invalid token" });
    return;
  }

  if (!id) {
    res.status(400).json({ success: false, msg: "User ID is required" });
    return;
  }

  if (typeof user !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'user' object. Received: ${JSON.stringify(user)}`,
    });
    return;
  }

  const errorList = validateUser(user);
  if (errorList.length > 0) {
    res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  } else {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user: updatedUser });
  }
};

export { validateUser };
