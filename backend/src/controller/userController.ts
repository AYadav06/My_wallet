import { Request,Response } from "express";
import { AuthSchema } from "../types/AuthScheme";
import { user } from "../model/user";



export const createUser=async(req:Request,res:Response)=>{
console.log("user is in createUser controller");
    try{
        const {firstName,lastName,email,password}=AuthSchema.parse(req.body);

        
            await user.create({
                firstName,lastName,email,password
            })
            res.status(200).json({
                message:"user is created.."
            })
    }
catch(e){
    res.json({
        message:"user is not created ...",
        error:e
    })
}
}