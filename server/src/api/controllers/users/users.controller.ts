import { createJWT, jwtExp } from "../../../config/jwt.config";
import { RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import {
	getAllUsers,
	findUserByEmail,
	createNewUser,
	getUserById,
	isUserExists,
	saveGoogleAccount,
} from "../../data-access/users/users.da";
import {
	INewUserInput,
	IHashedPassUser,
	SignInCredentials,
	ICredentials,
	IGoogleUser,
} from "../../types/users.types";
import { AuthenticatedRequest } from "../../types/jwt.types";
import passport from "passport";

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
	try {
		const user = req.body as INewUserInput;
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpLogin: RequestHandler = async (req, res) => {
	try {
		const credentials = req.body as SignInCredentials;
		let user: null | ICredentials;
		if (credentials.userName) {
			user = (await isUserExists(credentials.userName)) as ICredentials;
		} else if (credentials.email) {
			user = (await findUserByEmail(credentials.email)) as ICredentials;
		} else {
			user = null;
		}
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

export const httpAuthenticate = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	try {
		const userId = req.userId;
		if (!userId) {
			return res.status(400).json({
				auth: false,
				message: "Invalid user id",
			});
		}
		const user = await getUserById(userId);
		if (!user) {
			return res.status(404).json({
				auth: false,
				message: "user not found",
			});
		}
		return res.status(200).json({
			userId: user.userId,
			auth: true,
			userName: user.userName,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

// Controller to handle Google OAuth login
export const httpGoogleAuthenticate = passport.authenticate("google", {
	scope: ["profile", "email"],
});

// Controller to handle Google OAuth callback
export const httpGoogleAuthenticateCallback: RequestHandler = async (
	req,
	res,
	next
) => {
	const googleUser = req.user as IGoogleUser;

	if (!googleUser) {
		return res.status(400).send("User not found");
	  }

	let id: number | string;
	let token: string;
	const {emails,displayName}=googleUser;
	const email=emails[0].value;
	const userFromDB=await findUserByEmail(email);
	
	if(userFromDB){
		id=userFromDB.userId as number;
	}
	else{
		id=googleUser.id;
		await saveGoogleAccount({googleId: id, userName: displayName, email});
	}

	token = createJWT({ email, id});
	res.cookie("jwt", token, { httpOnly: true, maxAge: jwtExp * 1000 });

	// Render a page in the pop-up to send the user data back to the opener (original window)
	res.send(`
	<script>
		// Send user data to the opener (original window)
		window.opener.postMessage({ user: ${JSON.stringify(
			{
				auth: true,
				userId: id,
				userName: displayName
			}
		)} }, window.opener.location.origin);
		
		// Close the pop-up window
		window.close();
	</script>
`);
};

export const httpSignOut: RequestHandler = (req, res) => {
	try {
		res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
		return res.status(200).json({
			auth: false,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
