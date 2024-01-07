export interface ICommentsState {
	currentCommentsList: IComment[] | null;
	currentComment: IComment | null;
	loading: boolean;
	error: string | null;
}

export interface IComment {
	commentId: string;
	body: string;
	publisher: string;
	publisherId: number;
	rank: number;
}

export interface ICommentInput {
	postId: string;
	body: string;
	publisher: string;
	publisherId: number;
}

export interface ICommentForEditing {
	commentId: string;
	newContent: string;
	publisherId: number;
	editorId: number;
}
