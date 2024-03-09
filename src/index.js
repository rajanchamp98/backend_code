import 'dotenv/config'
import mongoose from "mongoose";
import connectDB from "./db/index.js";


// console.log(process.env.MONGODB_URI)

connectDB();




// connect to database 
// ;(async()=>{
//     try{
//        const respo= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
//         console.log("Database Connected Sucessfully!!")
//     }
//     catch(error){
//         console.log({
//             "Error":error
//         });
//         throw error
//     }
// })()

