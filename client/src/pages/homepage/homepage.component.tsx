import React, {ChangeEvent, useState} from "react";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import * as homepageStyle from "./homepage.tailwind";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { getGeneratedAnswer } from "../../redux/ai-guide/ai-guide.thunks";

interface IAnswer{
	text: string;
	duration: number;
	offset: number;
}
const Homepage = () => {
	const [prompt, setPrompt]=useState('');

	const dispatch = useDispatch<AppDispatch>();

	const handlePrompt=(event:ChangeEvent<HTMLInputElement>)=>{
		setPrompt(event.target.value);
	}

	const handleSubmit = async () => {
		const answer= await dispatch(getGeneratedAnswer(prompt));
		(answer.payload as Array<IAnswer>).map(line=>{
			console.log(line.text);
		})
	};

	return (
		<div className={homepageStyle.homepageContainer}>
			<h1>Game Flow</h1>
			<br />
			<div className='flex items-center rounded-[8px] px-2 bg-white'>
				<input
					className='rounded-[8px] h-[40px] w-[50vw] text-black indent-1 focus:outline-none'
					placeholder='Ask your question here'
					onChange={handlePrompt}
				></input>
				<SendIcon className='text-[#6f707e] cursor-pointer' onClick={handleSubmit} />
			</div>
			<br />
			or
			<br />
			<p>
				Go to the{" "}
				<Link to='/forum' className={homepageStyle.forum}>
					forum
				</Link>
			</p>
		</div>
	);
};

export default Homepage;
