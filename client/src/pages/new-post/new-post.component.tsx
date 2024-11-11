import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createPostThunk } from "../../redux/posts/posts.thunks";
import { ICurrentUser } from "../../redux/users/users.types";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/post-form/post-form.component";

interface IFormData {
	gameName: string;
	title: string;
	body: string;
	media: File | null;
}

const NewPost = () => {
	const [formData, setFormData] = useState<IFormData>({
		gameName: "",
		title: "",
		body: "",
		media: null,
	});

	const user = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	);

	const currentPost = useSelector(
		(state: RootState) => state.posts.currentPost
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		currentPost ? navigate(`/forum/post/${currentPost.postId}`) : null;
	}, [currentPost]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		if (typeof event !== "string") {
			const { name, value } = event.target;
			setFormData({ ...formData, [name]: value });
		} else {
			setFormData({ ...formData, body: event });
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files && e.target.files.length > 0
			? setFormData({ ...formData, media: e.target.files[0] })
			: null;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const post = {
			...formData,
			publisher: user.userName,
			publisherId: user.userId,
		};
		await dispatch(createPostThunk(post));
	};

	return (
		<PostForm
			editPost={false}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleFileChange={handleFileChange}
			fileName={formData.media?.name}
		/>
	);
};

export default NewPost;
