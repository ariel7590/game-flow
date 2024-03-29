import { Document } from "mongoose";

export interface IUserSchema extends Document {
	userId: number;
	userName: string;
	password: string;
	salt: string;
	email: string;
}

export interface IPostSchema extends Document {
	postId: string;
	publisher: string;
	publisherId: number;
	gameName: string;
	title: string;
	body: string;
	media: string[];
	deleted: boolean;
}

export interface ICommentSchema extends Document {
	commentId: string;
	postId: string;
	body: string;
	publisher: string;
	publisherId: number;
	rank: number;
	whoRanked: number[];
	media: string[];
	deleted: boolean;
}