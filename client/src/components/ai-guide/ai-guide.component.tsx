import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getGeneratedAnswer } from "../../redux/ai-guide/ai-guide.thunks";

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

	return <>{guide.loading ? <h1>Loading...</h1> : <div>{guide.answer}</div>}</>;
};

export default AiGuide;
