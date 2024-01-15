import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk } from "../../redux/posts/posts.thunks";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import PostForm from "../../components/post-form/post-form.component";

const EditPost = () => {
	const [formData, setFormData] = useState({
		gameName: "",
		title: "",
		body: "",
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

	return (
		<PostForm
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			editPost={true}
			gameName={formData.gameName}
			titleValue={formData.title}
			bodyValue={formData.body}
		/>
	);
};

export default EditPost;
