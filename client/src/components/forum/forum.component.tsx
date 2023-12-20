import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { getAllPostsThunk } from "../../redux/posts/posts.thunks";
import { enterPost } from "../../redux/posts/posts.slice";
import * as forumStyle from "./forum.tailwind";
import { ICurrentPost } from "../../redux/posts/posts.types";

const Forum = () => {
	const posts = useSelector((state: RootState) => state.posts.currentPostList);
	const dispatch = useDispatch<AppDispatch>();
	const navigate=useNavigate();

	useEffect(() => {
		dispatch(getAllPostsThunk([]));
	}, []);

	const handlePostNavigation=(post: ICurrentPost)=>{
		dispatch(enterPost(post));
		navigate(`/forum/post/${post.postId}`);
	}

	return (
		<div className={forumStyle.tableContainer}>
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
								<td className={forumStyle.titleTdStyle} onClick={()=>handlePostNavigation(post)}>
									{post.title}
								</td>
								<td className={forumStyle.byTdStyle}>{post.publisher}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Forum;
