import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.log("MongoDB connection error: ", err);
});

export async function mongoConnect() {
	await mongoose.connect(process.env.MONGO_URL!);
}

export async function mongoDisconnect() {
	await mongoose.disconnect();
}