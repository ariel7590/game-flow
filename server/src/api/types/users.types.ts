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

export type SignInCredentials = (Pick<ICredentials, "userName"> & { email?: never } | Pick<ICredentials, "email"> & { userName?: never }) & Pick<ICredentials, "password">