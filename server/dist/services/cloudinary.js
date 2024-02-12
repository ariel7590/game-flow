"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function cloudinaryConfig() {
    try {
        await cloudinary_1.v2.config({
            cloud_name: "dwobsryyr",
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
            secure: true,
        });
        console.log("Cloudinary configured successfully");
    }
    catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
}
exports.cloudinaryConfig = cloudinaryConfig;
