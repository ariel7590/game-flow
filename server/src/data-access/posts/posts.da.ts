import { postModel as postsDB } from "../../models/posts/posts.model";
import { generateRandomStringId } from "../../utils/random-string";
import { IPost, IReceivedPostContent } from "../../types/posts.types";

async function savePost(post: IPost) {
	try {
		await postsDB.findOneAndUpdate(
			{
				postId: post.postId,
			},
			post,
			{ upsert: true }
		);
	} catch (err) {
		console.error(err);
	}
}

export async function isPostExists(postId: string) {
	try {
		return await postsDB.findOne(
			{
				postId,
			},
			{
				_id: 0,
				__v: 0,
				deleted: 0,
			}
		);
	} catch (err) {
		console.error(err);
	}
}
export async function getAllPosts() { //for testing only, I can remove it later
	try {
		return await postsDB.find(
			{
				deleted: false,
			},
			{ _id: 0, __v: 0, deleted: 0 }
		);
	} catch (err) {
		console.error(err);
	}
}

export async function getPaginatedPosts(paginatedData: {
	skip: number;
	perPage: number;
}) {
	try {
		return await postsDB
			.find(
				{
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

export async function createNewPost(post: IReceivedPostContent) {
	const newPostId = generateRandomStringId(10);
	const newPost: IPost = { postId: newPostId, deleted: false, ...post };
	await savePost(newPost);
	return newPostId;
}

export async function editPost(
	postId: string,
	newGameName: string,
	newTitle: string,
	newContent: string,
	newMedia: string[],
) {
	try {
		const edited = await postsDB.updateOne(
			{
				postId,
				deleted: false,
			},
			{
				gameName: newGameName,
				title: newTitle,
				body: newContent,
				media: newMedia,
			}
		);
		if (edited.acknowledged && edited.matchedCount > 0) {
			return await isPostExists(postId);
		} else {
			return null;
		}
	} catch (err) {
		console.error(err);
	}
}

export async function deletePost(postId: string) {
	try {
		const deleted = await postsDB.updateOne(
			{
				postId: postId,
			},
			{
				deleted: true,
			}
		);
		return deleted.acknowledged && deleted.modifiedCount === 1;
	} catch (err) {
		console.error(err);
	}
}

export async function countNumberOfPosts() {
	try {
		return await postsDB.countDocuments({
			deleted: false,
		});
	} catch (err) {
		console.error(err);
	}
}