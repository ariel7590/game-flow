import { RequestHandler } from "express";
import {
	IComment,
	ICommentForEditing,
	ICommentInput,
} from "../../types/comments.types";
import {
	createNewComment,
	findCommentsWithPostId,
	deleteComment,
	editComment,
	findCommentWithCommentId,
} from "../../models/comments/comments.model";
import { isPostExists } from "../../models/posts/posts.model";

export const httpCreateNewComment: RequestHandler = async (req, res) => {
	const commentInput = req.body as ICommentInput;
	if (!commentInput) {
		return res.status(400).json({
			error: "Missing required comment!",
		});
	}
	if (
		commentInput.body === "" ||
		commentInput.postId === "" ||
		commentInput.publisher === ""
	) {
		return res.status(400).json({
			error: "Missing required comment properties!",
		});
	}
	const post = await isPostExists(commentInput.postId);
	if (!post) {
		return res.status(404).json({
			error: "Post not found!",
		});
	}
	const newComment = await createNewComment(commentInput);
	return res.status(201).json({
		commetId: newComment.commentId,
		publisher: newComment.publisher,
		body: newComment.body,
		rank: newComment.rank,
	});
};

export const httpFindCommentsWithPostId: RequestHandler = async (req, res) => {
	const postId = req.params.postId as string;
	if (!postId || postId === "") {
		return res.status(404).json({
			error: "Post ID is not found!",
		});
	}
	const comments = await findCommentsWithPostId(postId);
	if (!comments) {
		return res.status(404).json({
			error: "Failed at getting comments for this postId!",
		});
	}
	return res.status(200).json(comments);
};

export const httpDeleteComment: RequestHandler = async (req, res) => {
	const commentId = req.params.commentId as string;
	if (!commentId || commentId === "") {
		return res.status(404).json({
			error: "Comment ID is not found!",
		});
	}
	const deletedComment = await deleteComment(commentId);
	if (!deletedComment) {
		return res.status(500).json({
			error: "Couldn't delete comment",
		});
	}
	return res.status(200).json(deletedComment);
};

export const httpEditComment: RequestHandler = async (req, res) => {
	const comment = req.body as ICommentForEditing;
	const { commentId, newContent } = comment;
	if (!comment || commentId === "" || newContent === "") {
		return res.status(404).json({
			error: "Missing required fields!",
		});
	}
	const editedComment = await editComment(commentId, newContent);
	if (!editedComment) {
		return res.status(500).json({
			error: "Couldn't edit comment",
		});
	}
	return res.status(200).json({
		commentId,
		newContent,
	});
};
