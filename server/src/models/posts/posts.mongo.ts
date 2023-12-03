import mongoose from "mongoose";
import { IPostSchema } from "../../types/schemas.types";

const postsSchema = new mongoose.Schema<IPostSchema>({
	postId: {
		type: String,
		required: true,
	},
	creatorId: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	media: {
		type: [String],
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

export const postModel = mongoose.model<IPostSchema>("Posts", postsSchema);