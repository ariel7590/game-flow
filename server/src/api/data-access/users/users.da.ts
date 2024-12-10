import { userModel as usersDB } from "../../models/users/users.model";
import {
	IHashedPassUser,
	INewGoogleUserInput,
	IUserReadyForSaving,
} from "../../types/users.types";

const DEFAULT_USER_ID = 0;

async function getLatestUserId() {
	const latestUser = await usersDB.findOne().sort("-userId");
	if (!latestUser) {
		return DEFAULT_USER_ID;
	}
	return latestUser.userId;
}

export async function isUserExists(userName: string) {
	return await usersDB.findOne(
		{
			userName,
		},
		{ _id: 0, __v: 0, salt: 0 }
	);
}

export async function findUserByEmail(userEmail: string) {
	return await usersDB.findOne(
		{
			email: userEmail,
		},
		{ _id: 0, __v: 0 }
	);
}

async function saveAccount(user: IUserReadyForSaving) {
	await usersDB.findOneAndUpdate(
		{
			userId: user.userId,
		},
		user,
		{ upsert: true }
	);
}

export async function saveGoogleAccount(user: INewGoogleUserInput) {
	await usersDB.findOneAndUpdate(
		{
			email: user.email,
		},
		user,
		{ upsert: true }
	);
}

export async function getAllUsers() {
	return await usersDB.find(
		{},
		{ _id: 0, __v: 0, password: 0, salt: 0, active: 0 }
	);
}

export async function getUserById(id: number | string) {
	if (typeof id === "number") {
		return await usersDB.findOne(
			{ userId: id },
			{ _id: 0, __v: 0, password: 0, salt: 0, active: 0 }
		);
	} else {
		return await usersDB.findOne(
			{ googleId: id },
			{ _id: 0, __v: 0, password: 0, salt: 0, active: 0 }
		);
	}
}

export async function createNewUser(user: IHashedPassUser) {
	const newUserId = ((await getLatestUserId()) as number) + 1;
	const newUser = { userId: newUserId, ...user, active: true };
	await saveAccount(newUser);
	return newUserId;
}
