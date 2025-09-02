import express from 'express'
import { userRouter, accountRouter } from './routes';
import { ConnectDb } from './config/db';
import cookieParser from 'cookie-parser';
const app=express();
import cors from "cors";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/account",accountRouter);

app.listen(3000,()=>{
    ConnectDb();
    console.log("server is running on Port 3000")
})