import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, createSearchParams } from "react-router-dom";
import CommentForm from "../../components/comment-form/comment-form.component";
import { createNewCommentThunk } from "../../redux/comments/comments.thunks";
import { ICurrentUser } from "../../redux/users/users.types";


const NewComment = () => {
	const [formData, setFormData] = useState<{body: string; media: File | null}>({
		body: "",
		media: null
	});

	const user = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	);
	const postId = useSelector(
		(state: RootState) => state.posts.currentPost!.postId
	);
	const totalPages=useSelector(
		(state: RootState) => state.comments.pages
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({...formData, body: event.target.value});
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFormData({...formData, media: e.target.files[0]});
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		dispatch(
			createNewCommentThunk({
				postId,
				body: formData.body,
				media: formData.media,
				publisher: user.userName,
				publisherId: user.userId,
			})
		);
		navigate({
			pathname: `/forum/post/${postId}`,
			search: `?${createSearchParams({ page: totalPages.toString() })}`,
		}
			);
	};

	return (
		<CommentForm
			isEdit={false}
			handleSubmit={(e) => handleSubmit(e)}
			handleChange={(e) => handleChange(e)}
			handleFileChange={(e)=>handleFileChange(e)}
			fileName={formData.media?.name}
		/>
	);
};

export default NewComment;
