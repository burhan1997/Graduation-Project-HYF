import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String, default: "" },
  profile_picture: { type: String, default: "" },
  location: {
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  min_age_preference: { type: Number, default: 18 },
  max_age_preference: { type: Number, default: 99 },
  preferred_gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary"],
    default: "other",
  },
  max_distance_preference: { type: Number, default: 50 },
  created_at: { type: Date, default: Date.now },
  hobbies: { type: [String], default: [] }, // Hobbies as array of strings
  languages: { type: [String], default: [] }, // Languages as array of strings
});

const User = mongoose.model("User", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "password",
    "firstName",
    "lastName",
    "birthday",
    "gender",
    "bio",
    "profile_picture",
    "location",
    "min_age_preference",
    "max_age_preference",
    "preferred_gender",
    "max_distance_preference",
    "hobbies",
    "languages",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.email) {
    errorList.push("Email is a required field");
  }

  if (!userObject.password) {
    errorList.push("Password is a required field");
  }

  if (!userObject.firstName) {
    errorList.push("First Name is a required field");
  }

  if (!userObject.lastName) {
    errorList.push("Last Name is a required field");
  }

  return errorList;
};

export default User;
