import mongoose from "mongoose";
import { ICommentSchema } from "../../types/schemas.types";

const commentSchema = new mongoose.Schema<ICommentSchema>({
	commentId: {
		type: String,
		required: true,
	},
	postId: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	publisher: {
		type: String,
		required: true,
	},
	publisherId: {
		type: Number,
		required: true,
	},
	rank: {
		type: Number,
		required: true,
	},
	whoRanked: {
		type: [Number],
		required: true,
	},
	media: {
		type: [String],
	},
	deleted: {
		type: Boolean,
		required: true,
	},
});

export const commentModel = mongoose.model<ICommentSchema>(
	"Comments",
	commentSchema
);
