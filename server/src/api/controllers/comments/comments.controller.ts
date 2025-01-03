import { RequestHandler, Response } from "express";
import {
	IComment,
	ICommentForEditing,
	ICommentInput,
	IRankComment,
} from "../../types/comments.types";
import {
	createNewComment,
	findCommentsWithPostId,
	deleteComment,
	editComment,
	findCommentWithCommentId,
	getPaginatedComments,
	rankComment,
	countNumberOfComments,
} from "../../data-access/comments/comments.da";
import { isPostExists } from "../../data-access/posts/posts.da";
import { AuthenticatedRequest } from "../../types/jwt.types";
import { paginate } from "../../utils/pagination";
import { uploadToCloudinary } from "../../services/cloudinary.service";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const domPurify = DOMPurify(window);

export const httpCreateNewComment: RequestHandler = async (req, res) => {
	try {
		const commentInput = req.body as ICommentInput;
		const post = await isPostExists(commentInput.postId);
		if (!post) {
			return res.status(404).json({
				error: "Post not found!",
			});
		}
		const cleanComment = domPurify.sanitize(commentInput.body);
		const publisherId = +commentInput.publisherId;
		let uploadSecureUrl: string | undefined;
		if (req.file) {
			uploadSecureUrl = await uploadToCloudinary(req.file.path);
		}
		const mediaUrls: string[] = [];
		typeof uploadSecureUrl !== "undefined"
			? mediaUrls.push(uploadSecureUrl)
			: null;
		const newComment = await createNewComment({
			...commentInput,
			publisherId,
			body: cleanComment,
			media: mediaUrls,
		});
		return res.status(201).json({
			commetId: newComment.commentId,
			publisher: newComment.publisher,
			publisherId: newComment.publisherId,
			body: newComment.body,
			rank: newComment.rank,
			media: mediaUrls,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpFindCommentWithCommentId: RequestHandler = async (
	req,
	res
) => {
	try {
		const commentId = req.params.commentId as string;
		const comment = await findCommentWithCommentId(commentId);
		if (!comment) {
			return res.status(404).json({
				error: "Failed at getting comments for this postId!",
			});
		}
		return res.status(200).json(comment);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpFindCommentsWithPostId: RequestHandler = async (req, res) => {
	try {
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpGetPaginatedComments: RequestHandler = async (req, res) => {
	try {
		const page = req.query.page as string;
		const postId = req.params.postId as string;
		const perPage = 5;
		const paginationData = paginate(+page, perPage);
		const comments = await getPaginatedComments(postId, paginationData);
		if (!comments) {
			return res.status(404).json({
				error: "Failed at getting comments for this postId!",
			});
		}
		const totalNumOfComments = await countNumberOfComments(postId);
		const totalNumOfPages = totalNumOfComments
			? Math.ceil(totalNumOfComments / perPage)
			: 1;
		return res.status(200).json({ comments, pages: totalNumOfPages });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpDeleteComment = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	try {
		const commentId = req.params.commentId as string;
		const userId = req.userId as number;
		const comment = await findCommentWithCommentId(commentId);
		if (comment) {
			if (comment.publisherId !== userId) {
				console.log("publisher id: ",comment.publisherId);
				console.log("user id: ", userId);
				return res.status(401).json({
					error: "You are unathorized to delete this comment!",
				});
			}
			const updatedComments = await deleteComment(commentId, comment.postId);
			if (!updatedComments) {
				return res.status(500).json({
					error: "Couldn't delete comment",
				});
			}
			return res.status(200).json(updatedComments);
		}
		return res.status(404).json({
			error: "Comment with this ID is not found!",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpEditComment: RequestHandler = async (req, res) => {
	try {
		const comment = req.body as ICommentForEditing;
		const { commentId, newContent, publisherId, editorId } = comment;
		const publisherIdNum = +publisherId;
		const editorIdNum = +editorId;
		if (editorIdNum !== publisherIdNum) {
			return res.status(401).json({
				error: "You are unathorized to edit this comment!",
			});
		}
		let mediaUrls: string[] = [];
		if (req.file) {
			const uploadSecureUrl = await uploadToCloudinary(req.file.path);
			typeof uploadSecureUrl !== "undefined"
				? mediaUrls.push(uploadSecureUrl)
				: null;
		}
		const editedComment = await editComment(commentId, newContent, mediaUrls);
		if (!editedComment) {
			return res.status(500).json({
				error: "Couldn't edit comment",
			});
		}
		return res.status(200).json({
			commentId,
			newContent,
			newMedia: mediaUrls,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpRankComment: RequestHandler = async (req, res) => {
	try {
		const rankData = req.body as IRankComment;
		const { commentId, newRank, rankerId } = rankData;
		const comment = await findCommentWithCommentId(commentId);
		if (comment?.whoRanked.includes(rankerId)) {
			return res.status(401).json({
				error:
					"You already ranked this comment and you're not unathorized to rank this comment again!",
			});
		}
		const rankedComment = await rankComment(commentId, newRank, rankerId);
		if (!rankedComment) {
			return res.status(500).json({
				error: "Couldn't rank comment",
			});
		}
		return res.status(200).json(rankedComment);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
