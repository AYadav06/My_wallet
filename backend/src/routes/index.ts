import { Router } from "express";
import { createUser, signinUser, updateUser } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter=Router();
userRouter.post("/signup",createUser);
userRouter.post("/signin",signinUser);
userRouter.put("/update",authMiddleware,updateUser);
