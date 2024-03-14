import { RequestHandler, Response } from "express";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import {
	getAllPosts,
	createNewPost,
	deletePost,
	isPostExists,
	editPost,
	getPaginatedPosts,
	countNumberOfPosts
} from "../../data-access/posts/posts.da";
import { IPostForEditing, IReceivedPostContent } from "../../types/posts.types";
import { AuthenticatedRequest } from "../../types/jwt.types";
import { paginate } from "../../utils/pagination";

export const httpGetAllPosts: RequestHandler = async (req, res) => {
	//for testing only, I can remove it later
	const posts = await getAllPosts();
	return res.status(200).json(posts);
};

export const httpGetPaginatedPosts: RequestHandler = async (req, res) => {
	const page = req.query.page as string;
	const paginationData = paginate(+page);
	const posts = await getPaginatedPosts(paginationData);
	if (!posts) {
		return res.status(404).json({
			error: "Posts were not found!",
		});
	}
	const totalNumOfPosts = await countNumberOfPosts();
	const totalNumOfPages = totalNumOfPosts ? Math.ceil(totalNumOfPosts / 10) : 1;
	return res.status(200).json({posts, pages: totalNumOfPages});
};

export const httpGetPostById: RequestHandler = async (req, res) => {
	const postId = req.params.postId;
	const post = await isPostExists(postId);
	if (post) {
		return res.status(200).json(post);
	} else {
		return res.status(404).json({
			error: "Post not found!",
		});
	}
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
	const publisherId=+post.publisherId;
	let uploadResult: UploadApiResponse | null = null;
	let uploadSecureUrl = "";
	if (req.file) {
		uploadResult = await cloudinary.uploader.upload(req.file.path,{
			folder: "game-flow"
		});
		console.log("File uploaded to Cloudinary:", uploadResult);
		uploadSecureUrl=uploadResult.secure_url;
	}
	const mediaUrls:string[]=[];
	if (uploadResult){
		mediaUrls.push(uploadSecureUrl);
	}
	const postId = await createNewPost({...post, publisherId, media: mediaUrls});
	return res.status(201).json({
		postId,
		publisher: post.publisher,
		publisherId: publisherId,
		gameName: post.gameName,
		title: post.title,
		body: post.body,
		media: mediaUrls,
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
	try{
		const post = req.body as IPostForEditing;
		const userId = req.userId as number;
		if (!userId) {
			return res.status(400).json({
				auth: false,
				message: "Invalid user id",
			});
		}
		const { postId, newTitle, newContent, publisherId, newMedia } = post;
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
		const publisherIdNum=+publisherId;
		if (publisherIdNum !== userId) {
			return res.status(401).json({
				error: "You are unathorized to edit this post!",
			});
		}
		let mediaUrls:string[]=[];
		if (req.file) {
			const uploadResult = await cloudinary.uploader.upload(req.file.path,{
				folder: "game-flow"
			});
			console.log("File uploaded to Cloudinary:", uploadResult);
			const uploadSecureUrl=uploadResult.secure_url;
			mediaUrls.push(uploadSecureUrl);
		}
		if(mediaUrls.length===0 && newMedia?.trim() !== ""){
			mediaUrls=JSON.parse(newMedia);
		}
		const editedPost = await editPost(postId, newTitle, newContent, mediaUrls);
		if (!editedPost) {
			return res.status(500).json({
				error: "Couldn't edit post",
			});
		}
		return res.status(200).json(editedPost);
	}
	catch(error){
		console.log(error)
		return res.status(500).json({
			error
		})
	}
};
