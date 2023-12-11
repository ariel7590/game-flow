import { commentModel as commentDB } from "./comments.mongo";
import { generateRandomStringId } from "../../utils";
import { ICommentInput, IComment } from "../../types/comments.types";

async function saveToDB(comment: IComment) {
	try {
		return await commentDB.findOneAndUpdate(
			{
				commentId: comment.commentId,
			},
			comment,
			{
				upsert: true,
			}
		);
	} catch (err) {
		console.log(err);
	}
}

export async function findCommentsWithPostId(postId: string) {
	try {
		return await commentDB.find(
			{ postId: postId, deleted: false },
			{ _id: 0, __v: 0, deleted: 0 }
		);
	} catch (err) {
		console.log(err);
	}
}

export async function findCommentWithCommentId(commentId: string) {
	try {
		return await commentDB.findOne({ commentId });
	} catch (err) {
		console.log(err);
	}
}

export async function createNewComment(comment: ICommentInput) {
	const commentId = generateRandomStringId(10);
	const newComment: IComment = {
		commentId,
		...comment,
		rank: 0,
		deleted: false,
	};
	await saveToDB(newComment);
	return newComment;
}

export async function deleteComment(commentId: string) {
	try {
		const deleted = await commentDB.updateOne(
			{
				commentId: commentId,
				deleted: false,
			},
			{
				deleted: true,
			}
		);
		return deleted.acknowledged && deleted.matchedCount > 0;
	} catch (err) {
		console.error(err);
	}
}

export async function editComment(commentId: string, newContent: string) {
	try {
		const edited = await commentDB.updateOne(
			{
				commentId: commentId,
				deleted: false,
			},
			{
				body: newContent,
			}
		);
		return edited.acknowledged && edited.matchedCount > 0;
	} catch (err) {
		console.error(err);
	}
}
