export interface IPostState {
	currentPostList: ICurrentPost[] | null;
	currentPost: ICurrentPost | null;
	loading: boolean;
	error: string | null;
	totalNumOfPages: number;
}

export interface ICurrentPost {
	postId: string;
	publisher: string;
	publisherId: number;
	gameName: string;
	title: string;
	body: string;
	media: File | string[] | null;
}

export type NewPost = Omit<ICurrentPost, "postId">;

export interface IPostForEditing {
	postId: string;
	newGameName: string,
	newTitle: string;
	newMedia: string[] | File | null;
	newContent: string;
	publisherId: number;
}

export interface IGetPostsAPI {
	posts: ICurrentPost[] | null;
	pages: number;
}
