import mongoose from "mongoose";
import { ENV } from "./env";

export const ConnectDb=async ()=>{
    console.log(ENV.DB_URL);
   await mongoose.connect(ENV.DB_URL)
}