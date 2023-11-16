import { Document } from "mongoose";

export interface IUserSchema extends Document {
    userId: number,
	firstName: string,
	lastName: string,
	password: string,
	salt: string,
	email: string,
	profileImageUrl: string,
	active: boolean,
}