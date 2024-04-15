import { postModel as postsDB } from "../../models/posts/posts.model";
import { generateRandomStringId } from "../../utils/random-string";
import { IPost, IReceivedPostContent } from "../../types/posts.types";

async function savePost(post: IPost) {
	await postsDB.findOneAndUpdate(
		{
			postId: post.postId,
		},
		post,
		{ upsert: true }
	);

}

export async function isPostExists(postId: string) {
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

}
export async function getAllPosts() { //for testing only, I can remove it later
	return await postsDB.find(
		{
			deleted: false,
		},
		{ _id: 0, __v: 0, deleted: 0 }
	);

}

export async function getPaginatedPosts(paginatedData: {
	skip: number;
	perPage: number;
}) {
	return await postsDB
		.find(
			{
				deleted: false,
			},
			{ _id: 0, __v: 0, deleted: 0 }
		)
		.skip(paginatedData.skip)
		.limit(paginatedData.perPage);

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

}

export async function deletePost(postId: string) {
	const deleted = await postsDB.updateOne(
		{
			postId: postId,
		},
		{
			deleted: true,
		}
	);
	return deleted.acknowledged && deleted.modifiedCount === 1;

}

export async function countNumberOfPosts() {
	return await postsDB.countDocuments({
		deleted: false,
	});

}