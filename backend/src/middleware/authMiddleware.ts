import { NextFunction, Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ENV } from "../config/env";

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies?.token;

    if(!token){
        res.status(401).json({
            message:"Unauthorized user"
        })
        return;
    }
    try {
      const data = jwt.verify(token, ENV.JWT_SECRETE!);
      const payload = data as JwtPayload;
      if (!payload || !payload.userId) {
        res.status(401).json({ message: "Unauthorized user" });
        return;
      }
      req.userId = payload.userId as unknown as string;
      next();
    } catch (error:any) {
        if (error?.name === 'TokenExpiredError') {
          res.status(401).json({ message: "Token expired" });
          return;
        }
        res.status(401).json({ message: "Unauthorized user" });
    }
}