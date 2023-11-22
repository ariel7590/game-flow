export interface ILoginPayload {
    userName: string;
    password: string;
}

export interface ISignUpPayload extends ILoginPayload{
    email: string;
}

export interface ICurrentUser {
	auth: boolean;
	message: string;
}
export interface IUserState {
	currentUser: ICurrentUser;
	loading: boolean;
	error: string | null;
}
