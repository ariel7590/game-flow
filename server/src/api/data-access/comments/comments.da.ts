import { commentModel as commentDB } from "../../models/comments/comments.model";
import { generateRandomStringId } from "../../utils/random-string";
import { ICommentInput, IComment } from "../../types/comments.types";

async function saveToDB(comment: IComment) {
	return await commentDB.findOneAndUpdate(
		{
			commentId: comment.commentId,
		},
		comment,
		{
			upsert: true,
		}
	);

}

export async function findCommentsWithPostId(postId: string) {
	return await commentDB.find(
		{ postId: postId, deleted: false },
		{ _id: 0, __v: 0, deleted: 0 }
	);

}

export async function getPaginatedComments(
	postId: string,
	paginatedData: {
		skip: number;
		perPage: number;
	}
) {

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

}

export async function countNumberOfComments(postId: string) {
	return await commentDB.countDocuments({
		postId: postId,
		deleted: false,
	});

}

export async function findCommentWithCommentId(commentId: string) {
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
}

export async function editComment(commentId: string, newContent: string, newMedia: string[]) {
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

}

export async function rankComment(
	commentId: string,
	newRank: number,
	rankerId: number
) {
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
}
