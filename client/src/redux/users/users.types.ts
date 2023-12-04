export interface ILoginPayload {
    userName: string;
    password: string;
}

export interface ISignUpPayload extends ILoginPayload{
    email: string;
}

export interface IAuthFailed {
	auth: boolean;
	message: string;
}

export interface ICurrentUser {
	auth: boolean,
	userId: number,
	userName: string,
}

export interface IUserState {
	currentUser: IAuthFailed | ICurrentUser;
	loading: boolean;
	error: string | null | IAuthFailed;
}
