import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  // we can use _ inplace of res in parameter if we have no use of res in below code as we used above
  try {
    const token =
      req?.cookies?.accessToken ||
      req?.header("Authorization")?.accessToken.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decryptedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);

    // Here we are decrypting token by using verify method of jwt token and providing token and secrate code which we set in our env
    // after decryption it will hold all the data which we shared during definition of jwt generation scheama
    const user = await User.findById(decryptedToken._id).select(
      "-password -accessToken"
    );

    if (!user) {
      throw new ApiError(401, "invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    new ApiError(400, error?.message || "invalid access token");
  }
});
