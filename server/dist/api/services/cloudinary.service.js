"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
// cloudinary upload function
// stuff that I don't want to return as a response
const cloudinary_1 = require("cloudinary");
const uploadToCloudinary = async (path) => {
    try {
        const uploadResult = await cloudinary_1.v2.uploader.upload(path, {
            folder: "game-flow"
        });
        console.log("File uploaded to Cloudinary:", uploadResult);
        const uploadSecureUrl = uploadResult.secure_url;
        return uploadSecureUrl;
    }
    catch (error) {
        console.error("Upload has failed", error);
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
