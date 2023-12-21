import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createPostThunk } from "../../redux/posts/posts.thunks";
import * as newPostStyle from "./new-post.tailwind";
import { ICurrentUser } from "../../redux/users/users.types";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
	const [formData, setFormData] = useState({ title: "", body: "", media: "" });
	const publisher = useSelector(
		(state: RootState) => (state.users.currentUser as ICurrentUser).userName
	);

	const currentPost = useSelector(
		(state: RootState) => state.posts.currentPost
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(()=>{
		if (currentPost) {
			navigate(`/forum/post/${currentPost.postId}`);
		}
	}, [currentPost])

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const post = { ...formData, publisher };
		await dispatch(createPostThunk(post));
	};

	return (
		<div className={newPostStyle.container}>
			<h1 className={newPostStyle.pageTitle}>New Post</h1>
			<form
				className={newPostStyle.form}
				onSubmit={(event) => handleSubmit(event)}
			>
				<input
					type='text'
					name='title'
					className={newPostStyle.title}
					placeholder='Title'
					onChange={handleChange}
				/>
				<textarea
					name='body'
					className={newPostStyle.body}
					placeholder='Content...'
					onChange={handleChange}
				/>
				<button type='submit' className={newPostStyle.submit}>
					Send
				</button>
			</form>
		</div>
	);
};

export default NewPost;
