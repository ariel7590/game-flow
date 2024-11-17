import React, { KeyboardEvent } from "react";
import { PromptInputProps } from "./prompt-input.types";
import SendIcon from "@mui/icons-material/Send";

const PromptInput = ({
	handlePrompt,
	handleSubmit,
	style,
}: PromptInputProps) => {
	const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && !event.repeat) {
			await handleSubmit();
		}
	};

	return (
		<div className={'flex items-center rounded-[8px] px-2 bg-white ' + style}>
			<input
				className='rounded-[8px] h-[40px] w-[50vw] text-black indent-1 focus:outline-none'
				placeholder='Ask your question here'
				onChange={handlePrompt}
				onKeyDown={handleKeyDown}
			></input>
			<SendIcon
				className='text-[#6f707e] cursor-pointer'
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default PromptInput;
