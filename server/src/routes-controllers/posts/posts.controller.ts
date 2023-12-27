import { RequestHandler, Response } from "express";
import {
	getAllPosts,
	createNewPost,
	deletePost,
	isPostExists,
	editPost,
} from "../../models/posts/posts.model";
import { IPostForEditing, IReceivedPostContent } from "../../types/posts.types";
import { AuthenticatedRequest } from "../../types/jwt.types";

export const httpGetAllPosts: RequestHandler = async (req, res) => {
	const posts = await getAllPosts();
	return res.status(200).json(posts);
};

export const httpCreateNewPost: RequestHandler = async (req, res) => {
	const post = req.body as IReceivedPostContent;
	if (!post) {
		return res.status(400).json({
			error: "Missing required post!",
		});
	}
	if (post.body === "" || post.publisher === "" || post.title === "") {
		return res.status(400).json({
			error: "Missing required post properties!",
		});
	}
	const postId = await createNewPost(post);
	return res.status(201).json({
		postId,
		publisher: post.publisher,
		publisherId: post.publisherId,
		title: post.title,
		body: post.body,
		media: post.media,
	});
};

export const httpDeletePost = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const postId = req.params.postId;
	if (!postId || postId === "") {
		return res.status(400).json({
			error: "Invalid post id",
		});
	}
	const userId = req.userId as number;
	if (!userId) {
		return res.status(400).json({
			auth: false,
			message: "Invalid user id",
		});
	}
	const isExists = await isPostExists(postId);
	if (isExists) {
		if (isExists.publisherId !== userId) {
			return res.status(401).json({
				error: "You are unathorized to delete this post!",
			});
		}
		await deletePost(postId);
		return res.status(200).json({
			ok: `Post with ID ${postId} has been deleted!`,
		});
	}
	return res.status(404).json({
		error: "Post is not found!",
	});
};

export const httpEditPost = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const post = req.body as IPostForEditing;
	const userId = req.userId as number;
	if (!userId) {
		return res.status(400).json({
			auth: false,
			message: "Invalid user id",
		});
	}
	const { postId, newTitle, newContent, publisherId } = post;
	if (
		!post ||
		postId === "" ||
		newTitle === "" ||
		newContent === "" ||
		!publisherId
	) {
		return res.status(404).json({
			error: "Missing required fields!",
		});
	}
	if (publisherId !== userId) {
		return res.status(401).json({
			error: "You are unathorized to edit this post!",
		});
	}
	const editedPost = await editPost(postId, newTitle, newContent);
	if (!editedPost) {
		return res.status(500).json({
			error: "Couldn't edit post",
		});
	}
	return res.status(200).json(editedPost);
};
