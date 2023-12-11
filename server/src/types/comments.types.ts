export interface ICommentInput{
    postId: string;
	body: string;
	publisher: string;
}

export interface IComment extends ICommentInput{
    commentId: string;
	rank: number;
	deleted: boolean;
}

export interface ICommentForEditing {
    commentId: string;
    newContent: string;
}