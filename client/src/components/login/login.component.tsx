import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as loginStyles from "./login.tailwind";
import { ICredentials } from "./login.types";
import { loginThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [credentials, setCredentials] = useState<ICredentials>({
		userName: "",
		password: "",
	});

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			credentials.userName.length === 0 ||
			credentials.password.length === 0
		) {
			alert("Missing required fields!");
			return;
		}
		await dispatch(loginThunk(credentials));
		navigate('/');
	};

	return (
		<div className={loginStyles.loginContainer}>
			<h2>Sign In</h2>
			<form className={loginStyles.loginForm}>
				<input
					type='text'
					name='userName'
					className={loginStyles.loginInput}
					placeholder='Username'
					onChange={(e) => handleInputs(e)}
					required
				/>
				<input
					type='password'
					name='password'
					className={loginStyles.loginInput}
					placeholder='Password'
					onChange={(e) => handleInputs(e)}
					required
				/>
				<button type='submit' onClick={handleSubmit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
