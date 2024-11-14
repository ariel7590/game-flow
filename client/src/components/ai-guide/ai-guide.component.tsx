import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getGeneratedAnswer } from "../../redux/ai-guide/ai-guide.thunks";
import ReactMarkdown from "react-markdown";
import CircularProgress from "@mui/material/CircularProgress";

interface aiGuideProps {
	prompt: string;
}
const AiGuide = ({ prompt }: aiGuideProps) => {
	const guide = useSelector((state: RootState) => state.aiGuide);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const dispatchGuide = async () => {
			await dispatch(getGeneratedAnswer(prompt));
		};

		dispatchGuide();
	}, []);

	const loading = (
		<div className='flex justify-center mt-[20%]'>
			<CircularProgress size='4rem' className='text-[#f09b1c]' />
		</div>
	);

	const answer = (
		<div className='flex flex-col items-center p-[50px]'>
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
						li: ({ node, ...props }) => (
							<li className='self-start' {...props} />
						),
						ol: ({ node, ...props }) => (
							<ol className='list-[circle]' {...props} />
						),
						ul: ({ node, ...props }) => <ul className='mb-3' {...props} />,
						p: ({ node, ...props }) => <p className='my-2' {...props} />,
					}}
				/>
		</div>
	);

	return <>{guide.loading ? loading: answer}</>;
};

export default AiGuide;
