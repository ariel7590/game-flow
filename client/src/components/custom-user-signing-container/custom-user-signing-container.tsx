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
			"http://localhost:8000/users/auth/google", // The route to start Google login
			"GoogleLogin",
			`width=${width},height=${height},top=${top},left=${left}` // Pop-up window specs
		);

		// Listen for message from the pop-up window
		window.addEventListener("message", (event) => {
			// Security: ensure message is from the same origin
			if (event.origin !== "http://localhost:8000") return;

			// Handle the user data from the pop-up (e.g., store user info, update UI)
			console.log("User authenticated:", event.data);

			// Optionally: you can reload the page or update your application state here
			window.location.reload();

			if (event.data.user) {
				// Redirect the main window to a different page (e.g., profile page)
				window.location.href = "/"; // Adjust this route as needed
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
