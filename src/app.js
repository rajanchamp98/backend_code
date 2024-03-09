import express from "express";



const app=express();



app.use("/",(req,res)=>{
    res.send("Hi This app is running");
})





export default app;