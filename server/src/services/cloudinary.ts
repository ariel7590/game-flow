import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export async function cloudinaryConfig() {
	try {
		await cloudinary.config({
			cloud_name: "dwobsryyr",
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_SECRET_KEY,
			secure: true,
		});
		console.log("Cloudinary configured successfully");
	} catch (error) {
		console.error("Error configuring Cloudinary:", error);
	}
}
