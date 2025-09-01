import { Request,Response} from "express";
import { Account } from "../model/db";


export const getBalance=async(req:Request,res:Response)=>{
    try {
        const account=await Account.findOne({
            userId:req.userId
        }) 
        res.status(200).json({
            message:`Your account balance is ${account?.balance}`,
            balance:account!.balance
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const transferBalance=(req:Request,res:Response)=>{

    
}

