export interface INewUserInput {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

export interface IHashedPassUser extends INewUserInput{
	salt: string;
}

export interface IUserReadyForSaving extends IHashedPassUser {
	active: boolean;
	userId: number;
}

export interface ICredentials {
	email: string;
	password: string;
}
