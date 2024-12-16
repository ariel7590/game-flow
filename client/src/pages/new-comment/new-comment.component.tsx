import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, createSearchParams } from "react-router-dom";
import CommentForm from "../../components/comment-form/comment-form.component";
import { createNewCommentThunk, getRelevantCommentsThunk } from "../../redux/comments/comments.thunks";
import { ICurrentUser } from "../../redux/users/users.types";

const NewComment = () => {
	const [formData, setFormData] = useState<{
		body: string;
		media: File | null;
	}>({
		body: "",
		media: null,
	});

	const user = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	);
	const postId = location.pathname.split("/").reverse()[0];
	const totalPages = useSelector((state: RootState) => state.comments.pages);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();


	const handleChange = (event: string) => {
		setFormData({ ...formData, body: event });
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files && e.target.files.length > 0
			? setFormData({ ...formData, media: e.target.files[0] })
			: null;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		await dispatch(
			createNewCommentThunk({
				postId,
				body: formData.body,
				media: formData.media,
				publisher: user.userName,
				publisherId: user.userId,
			})
		);
		await setFormData({ ...formData, body: "" });
		await dispatch(getRelevantCommentsThunk({ postId, page: totalPages }));
		navigate({
			pathname: `/forum/post/${postId}`,
			search: `?${createSearchParams({ page: totalPages.toString() })}`,
		});
	};

	return (
		<CommentForm
			isEdit={false}
			handleSubmit={(e) => handleSubmit(e)}
			handleChange={(e) => handleChange(e as string)}
			handleFileChange={(e) => handleFileChange(e)}
			text={formData.body}
			fileName={formData.media?.name}
		/>
	);
};

export default NewComment;
