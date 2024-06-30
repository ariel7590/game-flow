import { v2 as cloudinary } from "cloudinary";
import config from "config";

export async function cloudinaryConfig() {
	try {
		await cloudinary.config({
			cloud_name: "dwobsryyr",
			api_key: config.get("cloudinaryAPI"),
			api_secret: config.get("cloudinarySecret"),
			secure: true,
		});
		console.log("Cloudinary configured successfully");
	} catch (error) {
		console.error("Error configuring Cloudinary:", error);
	}
}
