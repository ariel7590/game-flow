import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as navbarStyle from "./navbar.tailwind";
import { Link } from "react-router-dom";
import { ICurrentUser } from "../../redux/users/users.types";
import { Button } from "@mui/material";
import SignOut from "../sign-out/sign-out.component";


const NavBar = () => {
	const user = useSelector((state: RootState) => state.users.currentUser);

	return (
		<div className={navbarStyle.navbarContainer}>
			<Link to='/' className={navbarStyle.logo}>
				{/* <h2>Game Flow</h2> */}
				<img src="https://res.cloudinary.com/dwobsryyr/image/upload/v1724764496/game-flow/ga516kcamthrtemuzneo.jpg" width="200" height="200" alt="GameFlow" />
			</Link>
			{user.auth ? (
				<div className={navbarStyle.welcomeUser}>
					<div>Welcome</div>{" "}
					<SignOut username={(user as ICurrentUser).userName} />
				</div>
			) : (
				<div className="w-[9%] flex justify-between">
					<Link to='/forum' className={navbarStyle.signIn}>
						<Button
							variant='outlined'
							color='inherit'
							className='hover:text-[#747272] hover:border-[#747272] focus:outline-none'
						>
							Forum
						</Button>
					</Link>
					<Link to='/login' className={navbarStyle.signIn}>
						<Button
							variant='outlined'
							color='inherit'
							className='hover:text-[#747272] hover:border-[#747272] focus:outline-none'
						>
							Sign In
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default NavBar;
