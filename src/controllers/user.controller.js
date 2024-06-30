import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryFileUpload } from "../utils/cloudinary.js";

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

  // console.log(req.body);

  // validation
  if ([username, email, fullName].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // check if user exist or not
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User with same email or username already exist!");
  }

  // 4 check for image , check for avtar

  // console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is require");
  }

  const avatar = await cloudinaryFileUpload(avatarLocalPath);
  const coverImage = await cloudinaryFileUpload(coverImageLocalPath);

  // console.log(avatar);

  const userObject = {
    username: username.toLowerCase(),
    password,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    refreshToken: "",
  };

  const user = await User.create(userObject);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "user registation failed!");
  }

  // console.log(createdUser);

  res
    .status(201)
    .json(new ApiResponse("201", createdUser, "User creation successfull"));
});

// ------------------------------Register controller end here-----------------------------------------

// --------------------------------- log in controller start from here--------------------------------

const accessTokenAndRefreshTokenGenerator = async (user_id) => {
  try {
    const user = await User.findById({ user_id });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    //Important note:---- This is done to skip updation of password when refresh token is saving so we are usin validateBeforeSave as false which save refresh token without disturbing other fields that's it.

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generation refresh and access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // Steps to be followed for user login

  // 1 get data from req.body
  // 2 username or email
  // 3 check user exist or not
  // 4 password check
  // 5 access and refresh token generation and send to user
  // 6 send cookies

  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email) {
    throw new ApiError(400, "username or email is required!");
  }

  const getUser = await User.findById({ $or: [{ username }, { email }] });

  if (!getUser) {
    throw new ApiError(404, "User does not exist");
  }

  if (!password) {
    throw new ApiError(404, "password is required!");
  }

  const validatedUser = await getUser.isPasswordCorrect(password);

  if (!validatedUser) {
    throw new ApiError(401, "invalid credentials !");
  }

  const { accessToken, refreshToken } =
    await accessTokenAndRefreshTokenGenerator(getUser._id);
  // Here we got access token and refresh token by distructuring accessTokenAndRefreshTokenGenerator .

  // getting user details after excluding password and refreshToken fields

  const loggedInUser = await User.findById(getUser._id).select(
    "-password -refreshToken"
  );

  // now wewill sned these to cookies .

  const option = {
    httpOnly: true,
    secure: true,
  };
  res.status(200).cookie("refreshToken",refreshToken,option)
  .cookie("accessToken",accessToken,option).json(
    new ApiResponse(200,
      {
        user:loggedInUser,refreshToken,accessToken
      },
      "User Logged in successfully"
    )
  )
});

//--------------------------------- log in controller end here---------------------------------------

//--------------------------------- log out controller start from here-------------------------------


const logoutUser=asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(req.user._id,
    {
      $set:{
      "refreshToken":undefined
      },
      
    },
    {
      new:true
    }
  )

  const option = {
    httpOnly: true,
    secure: true,
  };

  res
  .status(200)
  .clearCookie("accessToken",option)
  .clearCookie("refreshToken",option)
  .json(new ApiResponse(200,{},"User logged out succesfully"))



})



export { registerUser, loginUser,logoutUser };
