import { NextFunction, Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ENV } from "../config/env";

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Unauthorized user"
        })
        return;
    };
    try {
  const data=jwt.verify(token,ENV.JWT_SECRETE!);
  req.userId=(data as unknown as JwtPayload).userId as unknown as string;
  next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized user" });
    }
}