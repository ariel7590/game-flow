import React, { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Button, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { ICredentials } from "./login.types";
import { loginThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [credentials, setCredentials] = useState<ICredentials>({
		userName: "",
		email: "",
		password: "",
	});

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prevData) => ({
			...prevData,
			userName:
				name === "usernameOrEmail"
					? value.includes("@") && value.split("@")[1].includes(".")
						? ""
						: value
					: prevData.userName,
			email:
				name === "usernameOrEmail"
					? value.includes("@") && value.split("@")[1].includes(".")
						? value
						: ""
					: prevData.email,
			password: name !== "usernameOrEmail" ? value : prevData.password,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			(credentials.userName.length === 0 && credentials.email.length === 0) ||
			credentials.password.length === 0
		) {
			alert("Missing required fields!");
			return;
		}
		await dispatch(loginThunk(credentials));
		navigate("/");
	};

	const loginInput =
		"text-[black] bg-[#e8f0fe] rounded-[7px] h-[35px] px-[5px]";

	return (
		<div className='flex flex-col justify-between border border-solid border-[white] min-w-6/12 w-[25rem] rounded-[7px] px-[7px] py-[20px] h-[20rem]'>
			<div className='mb-[15px]'>
				<h2>Sign In</h2>
			</div>
			<div className='flex flex-col h-[100%]'>
				<GoogleLoginButton style={{ padding: "10px", borderRadius: "7px"}} />
				<div className="flex items-center">
					<div className="w-[50%] h-0 border-solid border-y-[1px]"/>
					<span className='m-3'>Or</span>
					<div className="w-[50%] h-0 border-solid border-y-[1px]"/>
				</div>
				<form className='flex flex-col h-[100%] justify-between'>
					<Input
						type='text'
						name='usernameOrEmail'
						color='primary'
						disableUnderline
						className={loginInput}
						placeholder='Username Or Email'
						onChange={(e) =>
							handleInputs(e as React.ChangeEvent<HTMLInputElement>)
						}
						required
					/>
					<input
						type='password'
						name='password'
						className={loginInput}
						placeholder='Password'
						onChange={(e) => handleInputs(e)}
						required
					/>
					<Button
						type='submit'
						variant='contained'
						className='bg-[#5c5c65]'
						onClick={handleSubmit}
					>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
