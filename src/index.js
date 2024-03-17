import 'dotenv/config'
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import app from "./app.js";

const port=process.env.PORT || 8000;

// console.log(process.env.MONGODB_URI) 

connectDB().then((res)=>{
    
    console.log(res);
    const data =app.listen(port);
    console.log(`App is listening at Port no  ${port}`);

}).catch((error)=>{
     console.log("error in connection of DB");
});




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
// }

