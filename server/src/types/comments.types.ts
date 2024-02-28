export interface ICommentInput {
	postId: string;
	body: string;
	media: string[];
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
    publisherId: string; // received as string from the client due to FormData constrains
    editorId: number;
	newMedia: string; // received as string from the client due to FormData constrains
}

export interface IRankComment {
	commentId: string;
	newRank: number;
	rankerId: number;
}
