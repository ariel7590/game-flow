import { useState } from "react";
import { Button, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { ICredentials } from "./login.types";
import { loginThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import CustomUserSigningContainer from "../custom-user-signing-container/custom-user-signing-container";

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
		"text-[black] bg-[#e8f0fe] rounded-[7px] h-[35px] px-[5px] mb-[8px]";

	return (
		<CustomUserSigningContainer title='Login'>
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
					<div className='self-center text-sm mb-[8px]'>Forgot Password?</div>
					<Button
						type='submit'
						variant='contained'
						className='bg-[#f09b1c] hover:bg-[#fcba2b] mb-[8px]'
						onClick={handleSubmit}
					>
						Login
					</Button>
				</form>
				<div className='self-center mb-[5px]'>
					Don't have an account? click{" "}
					<span
						className='cursor-pointer underline'
						onClick={() => navigate("/signup")}
					>
						here
					</span>{" "}
					to sign up
				</div>
			</div>
		</CustomUserSigningContainer>
	);
};

export default Login;
