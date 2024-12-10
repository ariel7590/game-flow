import mongoose from "mongoose";
import { IUserSchema } from "../../types/schemas.types";

const usersSchema = new mongoose.Schema<IUserSchema>({
	googleId: {
		type: String,
		unique: true,
		sparse: true,
	},
	userId: {
		type: Number,
		required: function (this: IUserSchema) {
			return !this.googleId;
		  }
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: function (this: IUserSchema) {
			return !this.googleId;
		  }
	},
	salt: {
		type: String,
		required: function (this: IUserSchema) {
			return !this.googleId;
		  }
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
});

export const userModel = mongoose.model<IUserSchema>("Users", usersSchema);
