import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CommentForm from "../../components/comment-form/comment-form.component";
import { AppDispatch, RootState } from "../../redux/store";
import {
	editCommentThunk,
	getCommentByIdthunk,
} from "../../redux/comments/comments.thunks";
import { ICurrentUser } from "../../redux/users/users.types";

interface IFormData {
	body: string;
	media: string[] | File | null;
}

const EditComment = () => {
	const [formData, setFormData] = useState<IFormData>({
		body: "",
		media: [],
	});

	const comment = useSelector(
		(state: RootState) => state.comments.currentComment
	);

	const userId = useSelector(
		(state: RootState) => (state.users.currentUser as ICurrentUser).userId
	);

	const dispatch = useDispatch<AppDispatch>();

	const location = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		if (comment) {
			setFormData({ body: comment.body, media: comment.media });
		} else {
			if (userId && !(isNaN(userId))) {
				const commentId = location.pathname.split("/").reverse()[0];
				dispatch(getCommentByIdthunk(commentId));
			}
		}
	}, [comment, userId]);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, body: event.target.value });
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files && e.target.files.length > 0
		? setFormData({ ...formData, media: e.target.files[0] })
		: null;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const commentId = location.pathname.slice(-20);
		await dispatch(
			editCommentThunk({
				commentId,
				newContent: formData.body,
				newMedia: formData.media,
				publisherId: comment!.publisherId,
				editorId: userId,
			})
		);
		navigate("/" + location.pathname.slice(1, 32));
	};
	return (
		<CommentForm
			isEdit={true}
			handleChange={(event) => handleChange(event)}
			handleFileChange={(event) => handleFileChange(event)}
			handleSubmit={(event) => handleSubmit(event)}
			text={formData.body}
			fileName={
				(formData.media as string[])[0] || (formData.media as File).name
			}
		/>
	);
};

export default EditComment;
