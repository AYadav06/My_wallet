import mongoose, { Schema,model } from 'mongoose';


const userModel=new Schema({
        email:{type:String,unique:true,require:true},
        firstName:String,
        lastName:String,
       password:{type:String}

});

cost 


export const user=model('User',userModel);