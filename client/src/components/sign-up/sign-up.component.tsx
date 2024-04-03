import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as signUpStyles from "./sign-up.tailwind";
import { ISignUpData } from "./sign-up.types";
import { signUpThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";

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
		response.payload
			? navigate("/")
			: null;
	};
	return (
		<div className={signUpStyles.signUpContainer}>
			<h2>Sign Up</h2>
			<form className={signUpStyles.signUpForm}>
				<input
					type='text'
					name='userName'
					className={signUpStyles.signUpInput}
					placeholder='Username'
					onChange={(e) => handleData(e)}
					required
				/>
				<input
					type='email'
					name='email'
					className={signUpStyles.signUpInput}
					placeholder='Email'
					onChange={(e) => handleData(e)}
					required
				/>
				<input
					type='password'
					name='password'
					className={signUpStyles.signUpInput}
					placeholder='Password'
					onChange={(e) => handleData(e)}
					required
				/>
				<input
					type='password'
					name='confirmPassword'
					className={signUpStyles.signUpInput}
					placeholder='Confirm Password'
					onChange={(e) => handleData(e)}
					required
				/>
				<button type='submit' onClick={handleSubmit}>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignUp;
