import { Router } from "express";
import { createUser, signinUser, updateUser } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getBalance } from "../controller/accountController";


export const userRouter=Router();
export const accountRouter=Router();
userRouter.post("/api/v1/auth/signup",createUser);
userRouter.post("/api/v1/auth/signin",signinUser);
userRouter.put("/api/v1/auth/update",authMiddleware,updateUser);
accountRouter.get("/api/v1/account/balance",authMiddleware,getBalance);