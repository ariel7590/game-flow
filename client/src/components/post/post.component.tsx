import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePostThunk } from "../../redux/posts/posts.thunks";
import * as postStyle from "./post.tailwind";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Post = () => {
	const post = useSelector((state: RootState) => state.posts.currentPost);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleDelete = async () => {
		// TODO: create a modal to ask if you sure you want to delete the post
		// or just use Swal
		await dispatch(deletePostThunk(post!.postId));
		navigate("/forum");
	};

	const handleEdit = () => {
		navigate(`/forum/post/edit-post/${post?.postId}`);
	};

	return (
		<div className={postStyle.postContainer}>
			<h2>{post!.title}</h2>
			<br />
			<p>{post!.body}</p>
			<br />
			<div className={postStyle.optionsAndDetailes}>
				<div className={postStyle.options}>
					<span className={postStyle.deleteEdit} onClick={handleDelete}>
						Delete
					</span>
					&nbsp; &nbsp;
					<span className={postStyle.deleteEdit} onClick={handleEdit}>
						Edit
					</span>
				</div>
				<span className={postStyle.publisher}>by: {post!.publisher}</span>
			</div>
		</div>
	);
};

export default Post;
