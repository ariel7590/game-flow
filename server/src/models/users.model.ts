import { userModel as usersDB } from "./users.mongo";
import { IHashedPassUser, IUserReadyForSaving } from "../types/users.types";

const DEFAULT_USER_ID = 0;

async function getLatestUserId() {
	const latestUser = await usersDB.findOne().sort("-userId");

	if (!latestUser) {
		return DEFAULT_USER_ID;
	}
	return latestUser.userId;
}

async function isUserExists(userId: number) {
	return await usersDB.findOne({
		userId: userId,
	});
}

export async function findUserByEmail(userEmail: string) {
	try {
		return await usersDB.findOne(
			{
				email: userEmail,
			},
			{ _id: 0, __v: 0 }
		);
	} catch (err) {
		console.error(err);
	}
}

async function saveAccount(user: IUserReadyForSaving) {
	try {
		await usersDB.findOneAndUpdate(
			{
				userId: user.userId,
			},
			user,
			{ upsert: true }
		);
	} catch (err) {
		console.error(err);
	}
}

export async function getAllUsers() {
	try {
		return await usersDB.find(
			{},
			{ _id: 0, __v: 0, password: 0, salt: 0, active: 0 }
		);
	} catch (err) {
		console.error(err);
	}
}

export async function getUserById(userId: number) {
	try {
		return await usersDB.findOne(
			{ userId: userId },
			{ _id: 0, __v: 0, password: 0, salt: 0, active: 0 }
		);
	} catch (err) {
		console.error(err);
	}
}

export async function createNewUser(user: IHashedPassUser) {
	const newUserId = (await getLatestUserId()) + 1;
	const newUser = { userId: newUserId, ...user, active: true };
	await saveAccount(newUser);
	return newUserId;
}
