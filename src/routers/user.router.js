import { Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import  Upload  from "../middleware/multer.middleware.js";


const userRouter=Router();



userRouter.route("/register").post(
    {
        
    
        
    },
    registerUser)




export {userRouter}