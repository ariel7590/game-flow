import React from "react";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { deletePostThunk } from "../../redux/posts/posts.thunks";
import * as postStyle from "./post.tailwind";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ICurrentUser } from "../../redux/users/users.types";
import AlertDialog from "../mui/alert-dialog.component";

const Post = () => {
	const post = useSelector((state: RootState) => state.posts.currentPost);
	const userId = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	).userId;
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleDelete = async () => {
		await dispatch(deletePostThunk(post!.postId));
		navigate("/forum");
	};

	const handleEdit = () => {
		navigate(`/forum/post/edit-post/${post?.postId}`);
	};

	return (
		<div className={postStyle.postContainer}>
			<h2>{post!.gameName}| {post!.title}</h2>
			<br />
			<p>{post!.body}</p>
			<br />
			<div className={postStyle.optionsAndDetailes}>
				{post?.publisherId === userId ? (
					<div className={postStyle.options}>
						<AlertDialog
							btnClassName={postStyle.deleteEdit}
							title='Delete a post'
							content='Are you sure you want to delete your post?'
							onAgree={handleDelete}
						> Delete </AlertDialog>
						&nbsp;
						<Button
							variant='text'
							className={postStyle.deleteEdit}
							onClick={handleEdit}
						>
							Edit
						</Button>
					</div>
				) : null}
				<span className={postStyle.publisher}>by: {post!.publisher}</span>
			</div>
		</div>
	);
};

export default Post;
