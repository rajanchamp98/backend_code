import express from "express";



const App=express();


App.get("/",(req,res)=>{
    res.send("server build sucessfully!")
})


App.listen("8080",()=>{
    console.log("App is listening at port no 8080")
})