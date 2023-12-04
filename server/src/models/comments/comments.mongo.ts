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
	rank: {
        type: Number,
        required: true
    }
});

export const commentModel = mongoose.model<ICommentSchema>(
	"Comments",
	commentSchema
);
