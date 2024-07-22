import express from "express";
import {
  createUser,
  updateUser,
  getUsers,
  getUser,
} from "../controllers/user.js";

import { authUser } from "../controllers/authUser.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.post("/sign-in", authUser);

export default userRouter;
