import multer from 'multer';
import path from 'path'; // Add this line
import dotenv from 'dotenv';
dotenv.config();
// Configure Multer for image upload
const storage = multer.diskStorage({});
const uploadImage = multer({
    storage: storage,
    // limits: {
    //   fileSize: 5 * 1024 * 1024, // 5 MB in Bytes
    // },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /\.(png|jpg|jpeg)$/; // Regular expression to check file extensions
        if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
            return cb(new Error("Please upload an image with a valid format (png, jpg, or jpeg)."));
        }
        cb(null, true);
    },
});
import { v2 as cloudinary } from 'cloudinary';
// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("API_KEY_CLOUD:", process.env.API_KEY_CLOUD);
// console.log("API_SECRET_CLOUD:", process.env.API_SECRET_CLOUD);
cloudinary.config({
    cloud_name: "dlulkmk24",
    api_key: 669979551947332,
    api_secret: process.env.API_SECRET_CLOUD,
})
// const cloud = cloudinary.uploader.upload

const uploadImageToCloudinary = async (filePath) => {
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, { public_id: "olympic_flag" });
        console.log('Image uploaded to Cloudinary:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        throw error; // Rethrow the error for handling at a higher level
    }
};

export { uploadImage, uploadImageToCloudinary }