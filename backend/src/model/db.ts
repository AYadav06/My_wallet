import mongoose, { Schema,model } from 'mongoose';
import { strictObject } from 'zod';

const userSchema=new Schema({
        email:{type:String,unique:true,require:true},
        firstName:String,
        lastName:String,
       password:{type:String}

});

export const User=model('User',userSchema);
const accountSchema=new Schema({
  userId:{ type:mongoose.Schema.Types.ObjectId,ref:"User"},
  balance:{type:Number,require:true}
})
export const Account=model("Account",accountSchema);