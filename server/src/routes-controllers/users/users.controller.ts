import { createJWT, jwtExp } from "../../jwt/jwt.config";
import { RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import {
	getAllUsers,
	findUserByEmail,
	createNewUser,
	getUserById,
	isUserExists,
} from "../../models/users/users.model";
import {
	INewUserInput,
	ICredentials,
	IHashedPassUser,
} from "../../types/users.types";
import { AuthenticatedRequest } from "../../types/jwt.types";


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
	if (!user.userName || !user.password || !user.email) {
		return res.status(400).json({
			message: "Missing required user properties!",
		});
	}
	const userWithEmail = await findUserByEmail(user.email);
	if (userWithEmail) {
		return res.status(400).json({
			message: "Account with this email already exists!",
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
	res.cookie("jwt", token, { httpOnly: true, maxAge: jwtExp * 1000 });
	return res.status(201).json({
		auth: true,
		userId: userId,
		userName: user.userName,
	});
};

export const httpLogin: RequestHandler = async (req, res) => {
	const credentials = req.body as ICredentials;
	const user = await isUserExists(credentials.userName);
	if (!user) {
		return res.status(404).json({
			message: "User not found!",
		});
	}
	const match = await bcrypt.compare(credentials.password, user.password);
	if (!match) {
		return res.status(404).json({
			message: "Incorrect password!",
		});
	}
	const token = createJWT({ email: user.email, id: user.userId });
	res.cookie("jwt", token, { httpOnly: true, maxAge: jwtExp * 1000 });
	return res.status(200).json({
		auth: true,
		userId: user.userId,
		userName: user.userName,
	});
};

export const httpAuthenticate = async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.userId as number;
	console.log(userId);
	if (!userId) {
		return res.status(400).json({
			auth: false,
			message: "Invalid user id",
		});
	}
	const user = await getUserById(userId);
	if (!user) {
		return res.status(404).json({
			auth:false,
			message: "user not found",
		});
	}
	return res.status(200).json({
		userId: user.userId,
		auth: true,
		userName: user.userName,
	});
};
