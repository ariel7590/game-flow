import { createJWT, /*verifyJWT,*/ jwtExp } from "../jwt/jwt.config";
import { RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import {
	getAllUsers,
	findUserByEmail,
	createNewUser,
	getUserById,
} from "../models/users.model";
import {
	INewUserInput,
	ICredentials,
	IHashedPassUser,
} from "../types/users.types";
import { AuthenticatedRequest } from "../types/jwt.types";

// const {

// 	getUserById,
// 	deactivateUser,
// 	isUserExists,
// } = require("../../models/users/users.model");
// const bcrypt = require("bcrypt");

export const httpGetAllUsers: RequestHandler = async (req, res) => {
	// this function is for testing only, I can delete it later
	const users = await getAllUsers();
	return res.status(200).json(users);
};

export const httpGetUserById: RequestHandler = async (req, res) => {
	// this function is for testing only, I can delete it later
	const userId = Number(req.params.userId);
	if (!userId) {
		return res.status(400).json({
			error: "Invalid user id",
		});
	}
	const user = await getUserById(userId);
	if (!user) {
		return res.status(404).json({
			error: "user not found",
		});
	}
	return res.status(200).json(user);
};

export const httpCreateNewUser: RequestHandler = async (req, res) => {
	const user = req.body as INewUserInput;
	if (!user.firstName || !user.lastName || !user.password || !user.email) {
		return res.status(400).json({
			error: "Missing required user properties!",
		});
	}
	const userWithEmail = await findUserByEmail(user.email);
	if (userWithEmail) {
		return res.status(400).json({
			error: "Account with this email already exists!",
		});
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(user.password, salt);
	const hashedPassUser: IHashedPassUser = {
		...user,
		password: hashedPassword,
		salt: salt,
	};
	const userId: number = await createNewUser(hashedPassUser);
	const token = createJWT({ email: user.email, id: userId });
	const blankProfileImage =
		"https://res.cloudinary.com/dwobsryyr/image/upload/f_auto,q_auto/v1/faces-and-books/qhvyxsejupgbcrderwv4";
	res.cookie("jwt", token, { httpOnly: true, maxAge: jwtExp * 1000 });
	return res.status(201).json({
		status: "created!",
		auth: true,
		userId: userId,
		firstName: user.firstName,
		lastName: user.lastName,
		profileImageUrl: blankProfileImage,
	});
};

export const httpLogin: RequestHandler = async (req, res) => {
	const credentials = req.body as ICredentials;
	const user = await findUserByEmail(credentials.email);
	if (!user) {
		return res.status(404).json({
			error: "User not found!",
		});
	}
	console.log(user);
	const match = await bcrypt.compare(credentials.password, user.password);
	if (!match) {
		return res.status(404).json({
			error: "Incorrect password!",
		});
	}
	const token = createJWT({ email: user.email, id: user.userId });
	res.cookie("jwt", token, { httpOnly: true, maxAge: jwtExp * 1000 });
	return res.status(200).json({
		status: "Logged in",
		auth: true,
		userId: user.userId,
		firstName: user.firstName,
		lastName: user.lastName,
		profileImageUrl: user.profileImageUrl,
	});
};

export const httpAuthenticate = async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.userId as number;
	if (!userId) {
		return res.status(400).json({
			error: "Invalid user id",
		});
	}
	const user = await getUserById(userId);
	if (!user) {
		return res.status(404).json({
			error: "user not found",
		});
	}
	return res.status(200).json({
		userId: user.userId,
		auth: true,
		firstName: user.firstName,
		lastName: user.lastName,
		profileImageUrl: user.profileImageUrl,
	});
};

// module.exports = {
// 	httpGetAllUsers,
// 	httpGetUserById,
// 	httpCreateNewUser,
// 	httpLogin,
// 	httpDeactivateUser,
// 	httpAuthenticate,
// };
