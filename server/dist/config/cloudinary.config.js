"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("config"));
async function cloudinaryConfig() {
    try {
        await cloudinary_1.v2.config({
            cloud_name: "dwobsryyr",
            api_key: config_1.default.get("cloudinaryAPI"),
            api_secret: config_1.default.get("cloudinarySecret"),
            secure: true,
        });
        console.log("Cloudinary configured successfully");
    }
    catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
}
exports.cloudinaryConfig = cloudinaryConfig;
