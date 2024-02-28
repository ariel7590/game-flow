export interface ICommentsState {
	currentCommentsList: IComment[] | null;
	pages: number;
	currentComment: IComment | null;
	loading: boolean;
	error: string | null;
}

export interface IGetCommentsAPI {
	comments: IComment[] | null;
	pages: number;
}

export interface IComment {
	commentId: string;
	body: string;
	media: string[];
	publisher: string;
	publisherId: number;
	rank: number;
	whoRanked: number[];
}

export interface ICommentInput {
	postId: string;
	body: string;
	publisher: string;
	publisherId: number;
	media: File | null;
}

export interface ICommentForEditing {
	commentId: string;
	newContent: string;
	newMedia: File | string[] | null;
	publisherId: number;
	editorId: number;
}

export interface ICommentsPage {
	postId: string;
	page: number;
}

export interface IRankComment {
	commentId: string;
	newRank: number;
	rankerId: number;
}

