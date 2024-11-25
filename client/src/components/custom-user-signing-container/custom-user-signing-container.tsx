import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { googleLoginThunk } from "../../redux/users/users.thunks";
import { GoogleLoginButton } from "react-social-login-buttons";

interface ContainerProps {
	title: string;
	children: ReactNode;
}

const CustomUserSigningContainer = ({ title, children }: ContainerProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleGoogleSignIn = () => {
		dispatch(googleLoginThunk({}));
	};

	return (
		<div className='flex flex-col justify-between border border-solid border-[white] min-w-6/12 w-[25rem] rounded-[7px] px-[7px] py-[20px] min-h-[20rem]'>
			<div className='mb-[15px]'>
				<div className='font-bold text-center text-2xl'>{title}</div>
			</div>
			{children}
			<div className='flex items-center'>
				<div className='w-[50%] h-0 border-solid border-y-[1px]' />
				<span className='m-3'>Or</span>
				<div className='w-[50%] h-0 border-solid border-y-[1px]' />
			</div>
			<GoogleLoginButton
				onClick={handleGoogleSignIn}
				style={{ padding: "10px", borderRadius: "7px" }}
			>
				<span>Login with Google</span>
			</GoogleLoginButton>
		</div>
	);
};

export default CustomUserSigningContainer;
