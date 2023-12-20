export interface IPostState {
	currentPostList: ICurrentPost[] | null;
	currentPost: ICurrentPost | null;
	loading: boolean;
	error: string | null;
}

export interface ICurrentPost {
	postId: string;
	publisher: string;
    title: string;
	body: string;
	media: string;
}
