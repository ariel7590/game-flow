export interface INewUserInput {
	userName: string;
	password: string;
	email: string;
}

export interface IHashedPassUser extends INewUserInput {
	salt: string;
}

export interface IUserReadyForSaving extends IHashedPassUser {
	userId: number;
}

export interface INewGoogleUserInput {
	googleId: string | number;
	userName: string;
	email: string;
}

export interface ICredentials {
	userName: string;
	email: string;
	password: string;
	userId: number;
}

export interface OAuthUser {
	id: string;
	displayName: string;
	email: string;
	profilePhotoUrl: string;
}

export type SignInCredentials = (
	| (Pick<ICredentials, "userName"> & { email?: never })
	| (Pick<ICredentials, "email"> & { userName?: never })
) &
	Pick<ICredentials, "password">;

export interface IGoogleUser extends Express.User {
	id: string;
	emails: {value: string, verified: boolean}[];
	displayName: string;
}
