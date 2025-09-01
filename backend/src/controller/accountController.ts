import { Request,Response} from "express";
import { Account } from "../model/db";
import mongoose, { mongo } from "mongoose";


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

export const transferBalance=async(req:Request,res:Response)=>{
const session=await mongoose.startSession();
const {amount,to}=req.body;

const account=await Account.findOne({
    userId:req.userId
}).session(session);



if(!account  || account.balance! <amount){
    await session.abortTransaction();
    res.status(400).json({
        message:"Insufficient Balance"
    })

}

const toAccount=await Account.findOne({
    userId:to
}).session(session)

if(!toAccount){
    await session.abortTransaction();
    res.status(400).json({
        message:"Invalid reciever account"
    })
}

await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

await session.commitTransaction();
res.json({
    message:"Transfer Successfull"
})
}

