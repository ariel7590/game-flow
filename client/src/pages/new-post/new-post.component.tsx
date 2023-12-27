import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createPostThunk } from "../../redux/posts/posts.thunks";
import { ICurrentUser } from "../../redux/users/users.types";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/post-form/post-form.component";

const NewPost = () => {
	const [formData, setFormData] = useState({ title: "", body: "", media: "" });
	const user = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	);

	const currentPost = useSelector(
		(state: RootState) => state.posts.currentPost
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentPost) {
			navigate(`/forum/post/${currentPost.postId}`);
		}
	}, [currentPost]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const post = { ...formData, publisher: user.userName, publisherId: user.userId };
		await dispatch(createPostThunk(post));
	};

	return <PostForm handleSubmit={handleSubmit} handleChange={handleChange} />;
};

export default NewPost;
