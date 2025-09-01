import { Router } from "express";
import { createUser, signinUser, updateUser } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getBalance, transferBalance } from "../controller/accountController";


export const userRouter=Router();
export const accountRouter=Router();

userRouter.post("/signup",createUser);
userRouter.post("/signin",signinUser);
userRouter.put("/update",authMiddleware,updateUser);

accountRouter.get("/balance",authMiddleware,getBalance);
accountRouter.post("/transfer",authMiddleware,transferBalance);