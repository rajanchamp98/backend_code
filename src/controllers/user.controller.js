import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  // 1 getting input from req.body
  // 2 validateing provided input
  // 3 check if user exist or not
  // 4 check for image , check for avtar
  // 5 upload them to cloudinary, avtar
  // 6 create user object - create entry in db
  // 7 remove password and refresh token field from response
  // 8 check for user creation
  // 9 return response

  const { fullName, username, email, password } = req.body;

  // validation 
  if ([username, email, fullName].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // check if user exist or not 
  const existedUser=await User.findOne({$or:[{username},{email}]});

  if (existedUser) {
    throw new ApiError(409,"User with same email or username already exist!")
    
  }

  // 4 check for image , check for avtar

  console.log(req.files)






  res.status(200).json({
    "full name": fullName,
    "User Name": username,
    email: email,
    Password: password,
  });
});

export { registerUser };
