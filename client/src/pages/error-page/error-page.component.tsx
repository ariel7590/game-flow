import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import errorIcon from "../../assets/error-icon.svg";

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center items-center mt-[10%]">
				<div className="flex flex-col items-center">
                    <img src={errorIcon} alt="Error" width="200px" height="200px" />
					<h1 className="text-9xl mb-2">WHOOPS!</h1>
					<h2 className="mb-2">Something went wrong.</h2>
					<h2 className="mb-2"> This is embarrassing!</h2>
					<Button
						variant='contained'
						className='bg-[#f09b1c] hover:bg-[#fcba2b] min-w-[115px] px-2 my-2'
						onClick={() => navigate("/")}
					>
						Go to homepage
					</Button>
				</div>
			</div>
		</>
	);
};

export default ErrorPage;
