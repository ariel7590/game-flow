import React, { ChangeEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import * as homepageStyle from "./homepage.tailwind";
import { Link } from "react-router-dom";
import AiGuide from "../../components/ai-guide/ai-guide.component";

const Homepage = () => {
	const [prompt, setPrompt]=useState('');
	const [isPromptReady, setIsPromptReady] = useState(false);

	const handlePrompt = (event: ChangeEvent<HTMLInputElement>) => {
		setPrompt(event.target.value);
	};

	const handleSubmit = () => {
		setIsPromptReady(true);
	};

	const idleHomepage = (
		<div className={homepageStyle.homepageContainer}>
			<h1>Game Flow</h1>
			<br />
			<div className='flex items-center rounded-[8px] px-2 bg-white'>
				<input
					className='rounded-[8px] h-[40px] w-[50vw] text-black indent-1 focus:outline-none'
					placeholder='Ask your question here'
					onChange={handlePrompt}
				></input>
				<SendIcon
					className='text-[#6f707e] cursor-pointer'
					onClick={handleSubmit}
				/>
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

	return(
		<>
		{
			!isPromptReady
			?
			idleHomepage
			:
			<AiGuide prompt={prompt} />
		}
		</>
	)
};

export default Homepage;
