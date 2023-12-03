export interface IPostState {
	currentPost: object | null;
	loading: boolean;
	error: string | null;
}

export interface ICurrentPost {
	postId: string;
	creatorId: number;
    title: string;
	body: string;
	media: string;
}
