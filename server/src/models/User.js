import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
  bio: { type: String, default: "" },
  profile_picture: { type: String, default: "" },
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
    "name",
    "lastname",
    "birthdate",
    "gender",
    "bio",
    "profile_picture",
    "hobbies",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (
    userObject.confirmPassword == null ||
    userObject.confirmPassword !== userObject.password
  ) {
    errorList.push("password and confirmPassword do not match");
  }

  if (userObject.name == null) {
    errorList.push("name is a required field");
  }

  if (userObject.lastname == null) {
    errorList.push("lastname is a required field");
  }

  if (userObject.birthdate == null) {
    errorList.push("birthdate is a required field");
  }

  if (userObject.gender == null) {
    errorList.push("gender is a required field");
  }

  return errorList;
};

export default User;
