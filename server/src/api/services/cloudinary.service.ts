// cloudinary upload function
// stuff that I don't want to return as a response
import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (path: string) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(path, {
            folder: "game-flow"
        });
        console.log("File uploaded to Cloudinary:", uploadResult);
        const uploadSecureUrl = uploadResult.secure_url;
        return uploadSecureUrl;
    } catch (error) {
        throw new Error("Upload has failed: " + error)
    }

}