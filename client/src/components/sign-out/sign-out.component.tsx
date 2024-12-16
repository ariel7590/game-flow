import { useDispatch } from "react-redux";
import { signoutThunk } from "../../redux/users/users.thunks";
import { AppDispatch } from "../../redux/store";
import Dropdown from "../dropdown/dropdown.component";
import { ISignoutProps } from "./sign-out.types";
import * as signoutStyle from "./sign-out.tailwind";

const SignOut = ({ username }: ISignoutProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleClick = () => {
		dispatch(signoutThunk({}));
	};

	return (
		<Dropdown
			btnVariant='text'
			btnText={username}
			btnStyle={signoutStyle.dropdown}
		>
			<div className={signoutStyle.signout} onClick={handleClick}>
				Sign Out
			</div>
		</Dropdown>
	);
};

export default SignOut;
