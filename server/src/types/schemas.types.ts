import { Document } from "mongoose";

export interface IUserSchema extends Document {
    userId: number,
	userName: string,
	password: string,
	salt: string,
	email: string,
}