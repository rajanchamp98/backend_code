import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";




const app=express(cors({
    origin:process.env.ORIGIN_URL
}));



app.use("/",(req,res)=>{
    res.send("Hi This app is running");
})





export default app;