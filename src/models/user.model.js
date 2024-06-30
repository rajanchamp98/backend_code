import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const userSchema =new  Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudnary pe upload hoga waha se link generate hoke store hoga
      required: true,
    },

    coverImage: {
      type: String, // cloudnary pe upload hoga waha se link generate hoke store hoga
      
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      // required: true,
    },
  },
  { timestamps:true}
);


// here we are using mongoose pre defined hooks 
/**
 * some predefined hooks are pre,post  
 * 
 * here we have used "save" as first argument 
 * 
 * 
 * Mongoose has 4 types of middleware: 
 * document middleware, 
 * model middleware,
 * aggregate middleware, 
 * query middleware
 * 
 * 
 * these are some constructor passed with middleware to perform action after that event:
 * 
 * validate
 * save
 * remove
 * updateOne
 * deleteOne
 * init (note: init hooks are synchronous)
 * 
 * 
 * 
 */

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next()
  }
  this.password=await bcrypt.hash(this.password,12);
  next()
})

userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken=function(){

  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName,
   },process.env.ACCESS_TOKEN_SECRATE,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   })
  
}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
    {
      _id:this._id,
      username:this.username
    },
    process.env.REFRESH_TOKEN_SECRATE,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User=mongoose.model("User",userSchema)
