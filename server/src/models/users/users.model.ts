import mongoose from "mongoose";
import { IUserSchema } from "../../types/schemas.types";

const usersSchema = new mongoose.Schema<IUserSchema>({
	userId: {
		type: Number,
		required: true,
	},
	userName: {
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
});

export const userModel = mongoose.model<IUserSchema>("Users", usersSchema);
