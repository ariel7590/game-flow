export interface INewUserInput {
	userName: string;
	password: string;
	email: string;
}

export interface IHashedPassUser extends INewUserInput{
	salt: string;
}

export interface IUserReadyForSaving extends IHashedPassUser {
	userId: number;
}

export interface ICredentials {
	userName: string;
	password: string;
}
