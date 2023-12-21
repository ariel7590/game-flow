import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { exitPost } from "../../redux/posts/posts.slice";
import { useNavigate } from "react-router-dom";
import { getAllPostsThunk } from "../../redux/posts/posts.thunks";
import { enterPost } from "../../redux/posts/posts.slice";
import * as forumStyle from "./forum.tailwind";
import { ICurrentPost } from "../../redux/posts/posts.types";

const Forum = () => {
	const posts = useSelector((state: RootState) => state.posts.currentPostList);
	const currentPost = useSelector(
		(state: RootState) => state.posts.currentPost
	);
	const isUserAuth = useSelector(
		(state: RootState) => state.users.currentUser.auth
	);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		async function initPostsState() {
			await dispatch(getAllPostsThunk([]));
			if (currentPost) {
				dispatch(exitPost());
			}
		}

		initPostsState();
	}, []);

	const handlePostNavigation = (post: ICurrentPost) => {
		dispatch(enterPost(post));
		navigate(`/forum/post/${post.postId}`);
	};

	const handleNewPost = () => {
		if (isUserAuth) {
			navigate("/forum/new-post");
		} else {
			navigate("/login");
		}
	};

	return (
		<div className={forumStyle.pageContainer}>
			<div className={forumStyle.tableContainer}>
				<button className={forumStyle.newPostButton} onClick={handleNewPost}>
					New Post
				</button>
				<table className={forumStyle.tableStyle}>
					<thead>
						<tr>
							<th className={forumStyle.thStyle}>Title</th>
							<th className={forumStyle.thStyle}>By</th>
						</tr>
					</thead>
					<tbody>
						{posts?.map((post) => {
							return (
								<tr key={post.postId}>
									<td
										className={forumStyle.titleTdStyle}
										onClick={() => handlePostNavigation(post)}
									>
										{post.title}
									</td>
									<td className={forumStyle.byTdStyle}>{post.publisher}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Forum;
