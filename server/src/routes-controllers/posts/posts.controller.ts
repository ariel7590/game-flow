import { RequestHandler } from "express";
import { getAllPosts, createNewPost, deletePost, isPostExists } from "../../models/posts/posts.model";
import { IReceivedPostContent } from "../../types/posts.types";



export const httpGetAllPosts: RequestHandler= async (req, res)=> {
	const posts = await getAllPosts();
	return res.status(200).json(posts);
}

export const httpCreateNewPost: RequestHandler=async (req, res)=> {
	const post = req.body as IReceivedPostContent;
	if (!post) {
		return res.status(400).json({
			error: "Missing required post!",
		});
	}
	if (post.body==="" || post.publisher==="" || post.title==="") {
		return res.status(400).json({
			error: "Missing required post properties!",
		});
	}
	const postId = await createNewPost(post);
	return res.status(201).json({
		postId,
		publisher: post.publisher,
		title: post.title,
		body: post.body,
		media: post.media,
	});
}

export const httpDeletePost: RequestHandler= async (req, res)=> {
	const postId = req.params.postId;
	if (!postId || postId === "") {
		return res.status(400).json({
			error: "Invalid post id",
		});
	}
	const isExists = await isPostExists(postId);
	if (isExists) {
		await deletePost(postId);
		return res.status(200).json({
			ok: `Post with ID ${postId} has been deleted!`,
		});
	}
	return res.status(404).json({
		error: "Post is not found!",
	});
}