import { ChangeEvent, useState } from "react";
import AiGuide from "../../components/ai-guide/ai-guide.component";
import logo from "../../assets/logo-color.svg";
import { Link } from "react-router-dom";
import PromptInput from "../../components/prompt-input/prompt-input.component";

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
			<PromptInput handlePrompt={handlePrompt} handleSubmit={handleSubmit} />
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
