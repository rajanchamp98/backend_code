import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);


export const User=mongoose.model("User",userSchema)
