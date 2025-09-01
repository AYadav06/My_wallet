import { Router } from "express";
import { createUser, signinUser } from "../controller/userController";

export const userRouter=Router();
userRouter.post("/signup",createUser);
userRouter.post("/signin",signinUser);