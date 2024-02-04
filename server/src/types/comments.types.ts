export interface ICommentInput {
	postId: string;
	body: string;
	publisher: string;
	publisherId: number;
}

export interface IComment extends ICommentInput {
	commentId: string;
	rank: number;
	deleted: boolean;
}

export interface ICommentForEditing {
	commentId: string;
	newContent: string;
    publisherId: number;
    editorId: number;
}

export interface IRankComment {
	commentId: string;
	newRank: number;
	rankerId: number;
}
