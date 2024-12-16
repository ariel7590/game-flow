import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk, getCurrentPost } from "../../redux/posts/posts.thunks";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import PostForm from "../../components/post-form/post-form.component";
import { ICurrentUser } from "../../redux/users/users.types";

interface IFormData {
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
		media: [],
	});
	const post = useSelector((state: RootState) => state.posts.currentPost);
	const userId = useSelector(
		(state: RootState) => (state.users.currentUser as ICurrentUser).userId
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (post) {
			setFormData({
				gameName: post.gameName,
				title: post.title,
				body: post.body,
				media: post.media as string[],
			});
		} else {
			if (userId && !isNaN(userId)) {
				const postId = location.pathname.split("/").reverse()[0];
				dispatch(getCurrentPost(postId));
			}
		}
	}, [post, userId]);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		post
			? (await dispatch(
					editPostThunk({
						postId: post.postId,
						newGameName: formData.gameName,
						newTitle: formData.title,
						newContent: formData.body,
						publisherId: post.publisherId,
						newMedia: formData.media,
					})
			),
			navigate(`/forum/post/${post.postId}`))
			: console.log("Something went wrong with the editing!");
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		if (typeof event === "string") {
			setFormData({ ...formData, body: event });
		} else {
			const { name, value } = event.target;
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files && e.target.files.length > 0
			? setFormData({ ...formData, media: e.target.files[0] })
			: null;
	};

	return (
		<PostForm
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleFileChange={(e) => handleFileChange(e)}
			editPost={true}
			gameName={formData.gameName}
			titleValue={formData.title}
			bodyValue={formData.body}
			fileName={
				(formData.media as string[])[0] || (formData.media as File).name
			}
		/>
	);
};

export default EditPost;
