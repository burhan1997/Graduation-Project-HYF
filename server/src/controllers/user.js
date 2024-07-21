import User, { validateUser } from "../models/User.js";
import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
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
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};
export const updateUser = async (req, res) => {
  try {
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
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update user, try again later" });
  }
};
