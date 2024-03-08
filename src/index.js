import 'dotenv/config'
import mongoose from "mongoose";
import connectDB from "./db/index.js";


// console.log(process.env.MONGODB_URI)

connectDB();




// connect to database 
// ;(async()=>{
//     try{
//        const respo= await mongoose.connect(`mongodb+srv://rajan:rajan1234@cluster0.uafmucb.mongodb.net/${DB_Name}`);
//         console.log("Database Connected Sucessfully!!")
//     }
//     catch(error){
//         console.log({
//             "Error":error
//         });
//         throw error
//     }
// })()

