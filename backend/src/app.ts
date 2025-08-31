import express from 'express'
import { userRouter } from './routes';
import { ConnectDb } from './config/db';
const app=express();

app.use(express.json());
app.use("/api/v1",userRouter);
app.listen(3000,()=>{
    ConnectDb();
    console.log("server is running on Port 3000")
})