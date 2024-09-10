import React, { ChangeEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AiGuide from "../../components/ai-guide/ai-guide.component";
import logo from "../../assets/logo-color.svg";
import { Link } from "react-router-dom";

const Homepage = () => {
	const [prompt, setPrompt] = useState("");
	const [isPromptReady, setIsPromptReady] = useState(false);

	const handlePrompt = (event: ChangeEvent<HTMLInputElement>) => {
		setPrompt(event.target.value);
	};

	const handleSubmit = () => {
		setIsPromptReady(true);
	};

	const idleHomepage = (
		<div className="min-h-[50vh] flex flex-col justify-center items-center w-[100%]">
			<img src={logo} alt='GameFlow' width='350' height='350' />
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
				<Link to='/forum' className="text-white">
					forum
				</Link>
			</p>
		</div>
	);

	return <>{!isPromptReady ? idleHomepage : <AiGuide prompt={prompt} />}</>;
};

export default Homepage;
