import { ReactNode } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";

interface ContainerProps {
	title: string;
	children: ReactNode;
}

const CustomUserSigningContainer = ({ title, children }: ContainerProps) => {
	// const dispatch = useDispatch<AppDispatch>();

	const handleGoogleSignIn = () => {
		const width = 500;
		const height = 600;
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		window.open(
			"/users/auth/google", // The route to start Google login
			"GoogleLogin",
			`width=${width},height=${height},top=${top},left=${left}` // Pop-up window specs
		);

		window.addEventListener("message", (event) => {
			const currentOrigin = window.location.origin;

			if (event.origin !== currentOrigin) {
				return; 
			}

			// Check if user data is present in the message
			if (event.data.user) {
				// Redirect the main window to a different page (e.g., home page)
				console.log("Origin: ", event.origin);
				console.log("User authenticated:", event.data);
				window.location.href = "/";
			}
		});
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
