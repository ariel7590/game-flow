export interface IPostState {
	currentPostList: ICurrentPost[] | null;
	currentPost: ICurrentPost | null;
	loading: boolean;
	error: string | null;
}

export interface ICurrentPost {
	postId: string;
	publisher: string;
	publisherId: number;
	title: string;
	body: string;
	media: string;
}

export type NewPost = Omit<ICurrentPost, "postId">;

export interface IPostForEditing {
	postId: string;
	newTitle: string;
	newContent: string;
	publisherId: number;
}
