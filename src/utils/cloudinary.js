import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRATE,
});

const cloudinaryFileUpload = async (localFilePath) => {
  try {
    // If local file not found 
    if (!localFilePath) return "No Local file path found ";
    // if local file path found then below line will be executed
    const response = await cloudinary.uploader.upload(localFilePath);
    console.log("File uploaded sucessfully")
    fs.unlinkSync(localFilePath)
    return response 
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove locally saved temporary file as upload operation got failed 
    return null
    
    


  }
};



export {cloudinaryFileUpload}