import {postModel as postsDB} from './posts.mongo'
import { randomBytes } from 'crypto';
import { IPost, IReceivedPostContent } from '../../types/posts.types';

function generateRandomStringId(length: number) {
    const idRandomBytes = randomBytes(length);
	const randomString = idRandomBytes.toString("hex");
	return randomString;
}

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
		return await postsDB.findOne({
			postId,
		});
	} catch (err) {
		console.error(err);
	}
}
export async function getAllPosts() {
	try {
		return await postsDB.find({}, { _id: 0, __v: 0, deleted: 0 });
	} catch (err) {
		console.error(err);
	}
}

export async function createNewPost(post: IReceivedPostContent) {
	const newPostId = generateRandomStringId(10);
	const newPost: IPost = { postId: newPostId, deleted:false, ...post };
	await savePost(newPost);
	return newPostId;
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