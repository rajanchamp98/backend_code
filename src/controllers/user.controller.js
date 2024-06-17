import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

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
  console.log(fullName)

  const userData = {
    "Full Name": fullName,
    "Username": username,
    "Email": email,
    "Password": password,
  };
  if(username==="" && email===""){
    console.log("email or username is required")
    res.status(400).json(new ApiResponse(400,"email or username is missing"))
  }
 // = assignment 
 // == checking without type 2=="2" true 
//  === checking with type 2==="2" false integer===string  false 

    res.status(200).json(new ApiResponse(200, userData));
});

export { registerUser };
