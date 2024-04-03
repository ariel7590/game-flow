import React, { useState } from "react";
import Login from "../../components/login/login.component";
import SignUp from "../../components/sign-up/sign-up.component";

enum loginSignup {
	Login,
	Signup,
}

const LoginSignupPage = () => {
	const [mode, setMode] = useState(loginSignup.Login);

	const handleMode = () => {
		mode === loginSignup.Login
		? setMode(loginSignup.Signup)
		: setMode(loginSignup.Login);
	};

const pageStyle='flex justify-center items-center min-h-[50vh]';

	return (
		<div className={pageStyle}>
			{mode === loginSignup.Login ? (
				<div>
					<Login />
					<div>
						Don't have an account? click&nbsp;
						<span className="underline cursor-pointer" onClick={handleMode}>here</span>
						&nbsp;to sign up
					</div>
				</div>
			) : (
				<div>
					<SignUp />
					<div>
						Already have an account? click&nbsp;
						<span className="underline cursor-pointer" onClick={handleMode}>here</span>
						&nbsp;to sign in
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginSignupPage;
