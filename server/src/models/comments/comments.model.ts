import { commentModel as commentDB } from "./comments.mongo";
import { generateRandomStringId } from "../../utils/random-string";
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

export async function getPaginatedComments(
	postId: string,
	paginatedData: {
		skip: number;
		perPage: number;
	}
) {
	try {
		return await commentDB
			.find(
				{
					postId: postId,
					deleted: false,
				},
				{ _id: 0, __v: 0, deleted: 0 }
			)
			.skip(paginatedData.skip)
			.limit(paginatedData.perPage);
	} catch (err) {
		console.error(err);
	}
}

export async function countNumberOfComments(postId: string) {
	try {
		return await commentDB.countDocuments({
			postId: postId,
			deleted: false,
		});
	} catch (err) {
		console.error(err);
	}
}

export async function findCommentWithCommentId(commentId: string) {
	try {
		return await commentDB.findOne(
			{
				commentId,
			},
			{
				_id: 0,
				__v: 0,
				deleted: 0,
			}
		);
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

export async function deleteComment(commentId: string, postId: string) {
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
		if (deleted.acknowledged && deleted.matchedCount > 0) {
			const updatedComments = await findCommentsWithPostId(postId);
			return updatedComments;
		}
	} catch (err) {
		console.error(err);
	}
}

export async function editComment(commentId: string, newContent: string, newMedia: string[]) {
	try {
		const edited = await commentDB.updateOne(
			{
				commentId: commentId,
				deleted: false,
			},
			{
				body: newContent,
				media: newMedia
			}
		);
		return edited.acknowledged && edited.matchedCount > 0;
	} catch (err) {
		console.error(err);
	}
}

export async function rankComment(
	commentId: string,
	newRank: number,
	rankerId: number
) {
	try {
		const ranked = await commentDB.updateOne(
			{
				commentId: commentId,
				deleted: false,
			},
			{
				rank: newRank,
				$push: { whoRanked: rankerId },
			}
		);
		if (ranked.acknowledged && ranked.matchedCount > 0) {
			return await findCommentWithCommentId(commentId);
		}
	} catch (err) {
		console.error(err);
	}
}
