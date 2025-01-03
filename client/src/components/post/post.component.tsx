import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
	deletePostThunk,
	getCurrentPost,
} from "../../redux/posts/posts.thunks";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import { ICurrentUser } from "../../redux/users/users.types";
import AlertDialog from "../mui/alert-dialog.component";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Post = () => {
	const post = useSelector((state: RootState) => state.posts.currentPost);
	const userId = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	).userId;
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	// In case I refresh the post page and it can't take the current post from the state anymore
	useEffect(() => {
		if (!post) {
			const reversedUrlArr = location.pathname.split("/").reverse();
			let id = reversedUrlArr[0];
			id === ""
				? id = reversedUrlArr[1]
				: null;
			dispatch(getCurrentPost(id));
		}
	}, []);

	const handleDelete = async () => {
		await dispatch(deletePostThunk(post!.postId));
		navigate("/forum");
	};

	const handleEdit = () => {
		navigate(`/forum/post/edit-post/${post!.postId}`);
	};

	return (
		<Paper className="border-[1px] border-white w-[50%] p-2 mb-10 rounded-none">
			<h3 className="font-bold">
				{post?.gameName}| {post?.title}
			</h3>
			<br />
			{/* Sanitaized the body in th server */}
			<p dangerouslySetInnerHTML={{ __html: post?.body as string }} />
			{
				post?.media && Array.isArray(post.media) && typeof (post.media[0]) === 'string'
					?
					<div>
						<br />
						{
							post.media.map((imgUrl) => {
								return (
									<img
										key={(post.media as string[]).indexOf(imgUrl)}
										src={imgUrl}
										alt={`image ${(post.media as string[]).indexOf(imgUrl)}`}
									/>
								)
							})
						}
					</ div>
					:
					null
			}
			<br />
			<div className="flex justify-between">
				{post?.publisherId === userId ? (
					<div className="w-[100%]">
						<AlertDialog
							btnClassName='cursor-pointer font-normal font-[400] focus:outline-none normal-case p-0 min-w-[40px]'
							title='Delete a post'
							content='Are you sure you want to delete your post?'
							onAgree={handleDelete}
						>
							<DeleteIcon className="text-black" />
						</AlertDialog>
						&nbsp;
						<Button
							variant='text'
							className='cursor-pointer font-normal font-[400] focus:outline-none normal-case p-0 min-w-[40px]'
							onClick={handleEdit}
						>
							<EditNoteIcon className="text-black" />
						</Button>
					</div>
				) : null}
				<span className="text-end w-[100%]">by: {post?.publisher}</span>
			</div>
		</Paper>
	);
};

export default Post;
