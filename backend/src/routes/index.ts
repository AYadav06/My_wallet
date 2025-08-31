import { Router } from "express";
import { createUser } from "../controller/userController";

export const userRouter=Router();
userRouter.post("/signup",createUser);