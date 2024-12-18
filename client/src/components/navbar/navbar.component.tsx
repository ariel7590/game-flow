import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ICurrentUser } from "../../redux/users/users.types";
import { Button } from "@mui/material";
import SignOut from "../sign-out/sign-out.component";

const NavBar = () => {
	const user = useSelector((state: RootState) => state.users.currentUser);
	const navigate = useNavigate();

	return (
		<div className='w-[100%] bg-[black] flex justify-between items-center px-2.5 py-2'>
			<div className='cursor-pointer' onClick={() => navigate("/")}>
				<img
					src='https://res.cloudinary.com/dwobsryyr/image/upload/v1725369573/game-flow/kohyb8ci417cg7ibfpsm.jpg'
					width='200'
					height='200'
					alt='GameFlow'
				/>
			</div>
			<div className='flex justify-between'>
				{user.auth ? (
					<div className='flex items-center'>
						<div>Welcome</div>{" "}
						<SignOut username={(user as ICurrentUser).userName} />
					</div>
				) : (
					<Button
						variant='outlined'
						color='inherit'
						className='cursor-pointer text-white min-w-[90px] hover:text-[#747272] hover:border-[#747272] focus:outline-none'
						onClick={() => navigate("/login")}
					>
						Sign In
					</Button>
				)}
				<Button
					variant='outlined'
					color='inherit'
					className='cursor-pointer text-white min-w-[90px] ml-[7px] hover:text-[#747272] hover:border-[#747272] focus:outline-none'
					onClick={() => {
						navigate("/forum");
					}}
				>
					Forum
				</Button>
			</div>
		</div>
	);
};

export default NavBar;
