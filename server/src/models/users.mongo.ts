import mongoose from "mongoose";
import { IUserSchema } from "../types/schemas.types";

const usersSchema = new mongoose.Schema<IUserSchema>({
	userId: {
		type: Number,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	profileImageUrl: {
		type: String,
		required: true,
		default:
			"https://res.cloudinary.com/dwobsryyr/image/upload/f_auto,q_auto/v1/faces-and-books/qhvyxsejupgbcrderwv4",
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
});

export const userModel = mongoose.model<IUserSchema>("Users", usersSchema);
