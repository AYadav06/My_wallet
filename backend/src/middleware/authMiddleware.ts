import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { ENV } from "../config/env";
import { user } from "../model/user";



export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{


    try {
        
  const token=req.cookies.token;

  if(!token){
    return res.status(401).json({
        message:"Unauthorized user"
    })
  };

  const decoded=jwt.verify(token,ENV.JWT_SECRETE);
  next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
}