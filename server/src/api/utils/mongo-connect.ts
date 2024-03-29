import mongoose from "mongoose";
import config from 'config';


mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.log("MongoDB connection error: ", err);
});

export async function mongoConnect() {
	await mongoose.connect(config.get('dbUri'));
}

export async function mongoDisconnect() {
	await mongoose.disconnect();
}