import User from "../models/User.js";
import { logError } from "../util/logging.js";

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
