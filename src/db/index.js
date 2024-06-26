import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

 const connectDB=async()=>{
    console.log(DB_Name)

    console.log(process.env.MONGODB_URI+" and Db name is "+DB_Name)
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        console.log(`\n MongoDB is connected successfully!!,${connectionInstance.connection.host}`);

    }catch(error){
        console.log("mongodb connection error");
        process.exit(1);
        
    }
}

export default connectDB