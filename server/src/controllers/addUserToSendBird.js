import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import { logError } from "../util/logging.js";

const SENDBIRD_API_TOKEN = process.env.REACT_APP_SENDBIRD_ACCESS_TOKEN;
const SENDBIRD_APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;
const MONGODB_URL = process.env.MONGODB_URL;

export const createOrUpdateSendbirdUser = async (user) => {
  const url = `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/users`;
  const headers = {
    "Content-Type": "application/json, charset=utf8",
    "Api-Token": SENDBIRD_API_TOKEN,
  };
  const data = {
    user_id: user._id.toString(),
    nickname: user.firstName,
    profile_url: user.profilePicture,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    logError(error);
  }
};

const migrateUsersToSendbird = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = await User.find();
  for (const user of users) {
    await createOrUpdateSendbirdUser(user);
  }
  mongoose.connection.close();
};

//migrateUsersToSendbird().catch((error) => logError(error));
