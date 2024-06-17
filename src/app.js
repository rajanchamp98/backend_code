import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";


const app=express(cors({
    origin:process.env.ORIGIN_URL,
    credentials:true,
}));


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));




// Router Area


import { userRouter } from "./routers/user.router.js";

// app.use("/",(req,res,next)=>{
//     res.send("server Started Sucessfully")
//     next()

// })


app.use("/user/v1",userRouter);







export default app;