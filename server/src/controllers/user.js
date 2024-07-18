import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Function that converts the given string id to ObjectId
const toObjectId = (id) => {
  try {
    return mongoose.Types.ObjectId(id);
  } catch (error) {
    return null;
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

    // Convert hobbies to ObjectId array
    const hobbyIds = user.hobbies.map(toObjectId).filter((id) => id !== null);

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create new user document
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      birthdate: user.birthdate,
      gender: user.gender,
      bio: user.bio,
      profile_picture: user.profile_picture,
      location: user.location,
      min_age_preference: user.min_age_preference,
      max_age_preference: user.max_age_preference,
      preferred_gender: user.preferred_gender,
      max_distance_preference: user.max_distance_preference,
      hobbies: hobbyIds, // Converted ObjectId array
    });

    // Save the user to MongoDB
    await newUser.save();

    // Create JWT token synchronously
    const token = jwt.sign({ user: { id: newUser._id } }, JWT_SECRET, {
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

export { validateUser };
