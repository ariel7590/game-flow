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
		"text-[black] bg-[#e8f0fe] rounded-[7px] h-[35px] px-[5px] mb-[5px]";

	return (
		<div className='flex flex-col justify-between border border-solid border-[white] min-w-6/12 w-[25rem] rounded-[7px] px-[7px] py-[20px] min-h-[20rem]'>
			<div className='mb-[15px]'>
				<div className='font-bold text-center text-2xl'>Sign in</div>
			</div>
			<div className='flex flex-col h-[100%]'>
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
					<Input
						type='password'
						name='password'
						color='primary'
						disableUnderline
						className={loginInput}
						placeholder='Password'
						onChange={(e) =>
							handleInputs(e as React.ChangeEvent<HTMLInputElement>)
						}
						required
					/>
					<div className='self-center text-sm mb-[5px]'>Forgot Password?</div>
					<Button
						type='submit'
						variant='contained'
						className='bg-[#5c5c65] mb-[5px]'
						onClick={handleSubmit}
					>
						Login
					</Button>
				</form>
				<div className='self-center'>
					Don't have an account? click{" "}
					<span className="cursor-pointer underline" onClick={() => navigate("/signup")}>here</span> to sign up
				</div>
				<div className='flex items-center'>
					<div className='w-[50%] h-0 border-solid border-y-[1px]' />
					<span className='m-3'>Or</span>
					<div className='w-[50%] h-0 border-solid border-y-[1px]' />
				</div>
				<GoogleLoginButton style={{ padding: "10px", borderRadius: "7px" }} />
			</div>
		</div>
	);
};

export default Login;
