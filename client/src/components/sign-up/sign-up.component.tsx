import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import { ISignUpData } from "./sign-up.types";
import { signUpThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";
import CustomUserSigningContainer from "../custom-user-signing-container/custom-user-signing-container";

const SignUp = () => {
	const [data, setData] = useState<ISignUpData>({
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			data.userName.length === 0 ||
			data.email.length === 0 ||
			data.password.length === 0 ||
			data.confirmPassword.length === 0
		) {
			alert("Missing required fields!");
			return;
		}
		if (data.password !== data.confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		const user = {
			userName: data.userName,
			email: data.email,
			password: data.password,
		};
		const response = await dispatch(signUpThunk(user));
		response.payload ? navigate("/") : null;
	};

	const signUpInput =
		"text-[black] bg-[#e8f0fe] rounded-[7px] h-[35px] px-[5px] mb-[8px]";

	return (
		<CustomUserSigningContainer title='Sign Up'>
			<form className='flex flex-col'>
				<Input
					type='text'
					name='userName'
					className={signUpInput}
					disableUnderline
					placeholder='Username'
					onChange={(e) => handleData(e as React.ChangeEvent<HTMLInputElement>)}
					required
				/>
				<Input
					type='email'
					name='email'
					className={signUpInput}
					disableUnderline
					placeholder='Email'
					onChange={(e) => handleData(e as React.ChangeEvent<HTMLInputElement>)}
					required
				/>
				<Input
					type='password'
					name='password'
					className={signUpInput}
					disableUnderline
					placeholder='Password'
					onChange={(e) => handleData(e as React.ChangeEvent<HTMLInputElement>)}
					required
				/>
				<Input
					type='password'
					name='confirmPassword'
					className={signUpInput}
					disableUnderline
					placeholder='Confirm Password'
					onChange={(e) => handleData(e as React.ChangeEvent<HTMLInputElement>)}
					required
				/>
				<Button
					type='submit'
					variant='contained'
					className='bg-[#5c5c65] mb-[8px]'
					onClick={handleSubmit}
				>
					Sign Up
				</Button>
			</form>
			<div className='self-center mb-[5px]'>
				Already have an account? click{" "}
				<span
					className='cursor-pointer underline'
					onClick={() => navigate("/login")}
				>
					here
				</span>{" "}
				to login
			</div>
		</CustomUserSigningContainer>
	);
};

export default SignUp;
