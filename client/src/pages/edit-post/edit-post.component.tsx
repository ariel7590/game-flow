import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk } from "../../redux/posts/posts.thunks";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import PostForm from "../../components/post-form/post-form.component";

interface IFormData{
	gameName: string;
	title: string;
	body: string;
	media: string[] | File | null;
}
const EditPost = () => {
	const [formData, setFormData] = useState<IFormData>({
		gameName: "",
		title: "",
		body: "",
		media: []
	});
	const post = useSelector((state: RootState) => state.posts.currentPost);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (post) {
			setFormData({
				gameName: post.gameName,
				title: post.title,
				body: post.body,
				media: post.media as string[]
			});
		}
	}, [post]);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (post) {
			await dispatch(
				editPostThunk({
					postId: post.postId,
					newTitle: formData.title,
					newContent: formData.body,
					publisherId: post.publisherId,
				})
			);
			navigate(`/forum/post/${post.postId}`);
		} else {
			console.log("Something went wrong with the editing!");
		}
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFormData({...formData, media: e.target.files[0]});
		}
	};

	return (
		<PostForm
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleFileChange={e=>handleFileChange(e)}
			editPost={true}
			gameName={formData.gameName}
			titleValue={formData.title}
			bodyValue={formData.body}
			fileName={(formData.media as string[])[0]}
		/>
	);
};

export default EditPost;
