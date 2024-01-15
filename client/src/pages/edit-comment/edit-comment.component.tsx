import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CommentForm from "../../components/comment-form/comment-form.component";
import { AppDispatch, RootState } from "../../redux/store";
import { editCommentThunk } from "../../redux/comments/comments.thunks";
import { ICurrentUser } from "../../redux/users/users.types";

const EditComment = () => {
	const [content, setContent] = useState("");

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
			setContent(comment.body);
		}
	}, [comment]);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const commentId = location.pathname.slice(-20);
		await dispatch(
			editCommentThunk({ commentId, newContent: content, publisherId: comment!.publisherId, editorId: userId })
		);
		navigate("/" + location.pathname.slice(1, 32));
	};
	return (
		<CommentForm
			isEdit={true}
			handleChange={(event) => handleChange(event)}
			handleSubmit={(event) => handleSubmit(event)}
			text={content}
		/>
	);
};

export default EditComment;
