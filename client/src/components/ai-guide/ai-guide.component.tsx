/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getGeneratedAnswer } from "../../redux/ai-guide/ai-guide.thunks";
import ReactMarkdown from "react-markdown";
import CircularProgress from "@mui/material/CircularProgress";
import PromptInput from "../prompt-input/prompt-input.component";

interface aiGuideProps {
	prompt: string;
}
const AiGuide = ({ prompt }: aiGuideProps) => {
	const [localPrompt, setLocalPrompt] = useState("");
	const guide = useSelector((state: RootState) => state.aiGuide);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const dispatchGuide = async () => {
			await dispatch(getGeneratedAnswer(prompt));
		};

		dispatchGuide();
	}, []);

	const handlePrompt = (event: ChangeEvent<HTMLInputElement>) => {
		setLocalPrompt(event.target.value);
	};

	const handleSubmit = async () => {
		await dispatch(getGeneratedAnswer(localPrompt));
	};

	const loading = (
		<div className='flex justify-center mt-[20%]'>
			<CircularProgress size='4rem' className='text-[#f09b1c]' />
		</div>
	);

	const answer = (
		<div className='flex flex-col items-center p-[50px]'>
			<div className='w-[50%] mb-[60px]'>
				<ReactMarkdown
					children={guide.answer}
					components={{
						h1: ({ node, ...props }) => (
							<h1 className='font-bold my-4 text-[1.5em]' {...props} />
						),
						h2: ({ node, ...props }) => (
							<h2 className='font-bold my-4 text-[1.5em]' {...props} />
						),
						h3: ({ node, ...props }) => (
							<h3 className='font-bold my-4' {...props} />
						),
						h4: ({ node, ...props }) => (
							<h4 className='font-bold my-3' {...props} />
						),
						li: ({ node, ...props }) => {
							if (node?.children) {
								let listStyle = "";
								node.children.map((child) => {
									if (child.type === "element" && child.tagName === "strong") {
										listStyle = "list-['-']";
									} else if (
										child.type === "element" &&
										child.tagName !== "strong"
									) {
										listStyle = "";
									} else if (
										child.type === "element" &&
										child.tagName === "p"
									) {
										listStyle = "list-[none]";
									} else if (child.type === "text") {
										listStyle = "list-[disc]";
									}
								});

								return (
									<li
										className={`self-start mb-[8px] ${listStyle}`}
										{...props}
									/>
								);
							}
						},
						ol: ({ node, ...props }) => <ol className='mb-3' {...props} />,
						ul: ({ node, ...props }) => <ul className='mb-3' {...props} />,
						p: ({ node, ...props }) => (
							<p className='my-2 list-[none]' {...props} />
						),
					}}
				/>
			</div>
			<PromptInput
				style='fixed bottom-[15px] w-[50%]'
				handlePrompt={handlePrompt}
				handleSubmit={handleSubmit}
			/>
		</div>
	);

	return <>{guide.loading ? loading : answer}</>;
};

export default AiGuide;
