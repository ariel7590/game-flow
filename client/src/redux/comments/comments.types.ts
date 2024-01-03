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
	rank: number;
}

export interface ICommentInput {
	postId: string;
	body: string;
	publisher: string;
}

export interface ICommentForEditing {
	commentId: string;
	newContent: string;
}
