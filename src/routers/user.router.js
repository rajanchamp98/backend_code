import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const userRouter = Router(); 


userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);


// secure routes

userRouter.route("/logout").post(verifyJwt,logoutUser)



export { userRouter }; 
