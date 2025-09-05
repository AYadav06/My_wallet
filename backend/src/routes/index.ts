import { Router } from "express";
import { createUser, signinUser, updateUser, getUser, getAllUsers, logoutUser } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getBalance, transferBalance } from "../controller/accountController";


export const userRouter=Router();
export const accountRouter=Router();

userRouter.post("/signup",createUser);
userRouter.post("/signin",signinUser);
userRouter.post("/logout",logoutUser)
userRouter.put("/update",authMiddleware,updateUser);
userRouter.get("/me",authMiddleware,getUser);
userRouter.get("/users",authMiddleware,getAllUsers);

accountRouter.get("/balance",authMiddleware,getBalance);
accountRouter.post("/transfer",authMiddleware,transferBalance);
