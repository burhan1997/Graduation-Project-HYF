import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthdate: { type: Date, required: false },
  gender: { type: String, required: true },
  bio: { type: String, default: "" },
  profile_picture: { type: String, default: "" },
  location: { type: String, default: "" },
  min_age_preference: { type: Number, default: 18 },
  max_age_preference: { type: Number, default: 99 },
  preferred_gender: {
    type: String,
    enum: ["male", "female", "non-binary", "other"],
    default: "other",
  },
  max_distance_preference: { type: Number, default: 50 },
  created_at: { type: Date, default: Date.now },
  hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hobby" }],
});

const User = mongoose.model("User", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "password",
    "confirmPassword",
    "firstName",
    "lastName",
    "birthdate",
    "gender",
    "bio",
    "profile_picture",
    "location",
    "min_age_preference",
    "max_age_preference",
    "preferred_gender",
    "max_distance_preference",
    "hobbies",
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

  if (userObject.password !== userObject.confirmPassword) {
    errorList.push("Password and Confirm Password do not match");
  }

  if (!userObject.firstName) {
    errorList.push("First Name is a required field");
  }

  if (!userObject.lastName) {
    errorList.push("Last Name is a required field");
  }

  if (userObject.birthdate && isNaN(Date.parse(userObject.birthdate))) {
    errorList.push("Birthdate must be a valid Date");
  }

  if (!userObject.gender) {
    errorList.push("Gender is a required field");
  }

  return errorList;
};

export default User;
