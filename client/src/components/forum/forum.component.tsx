import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { getAllPostsThunk } from "../../redux/posts/posts.thunks";
import * as forumStyle from "./forum.tailwind";

const Forum = () => {
	const posts = useSelector((state: RootState) => state.posts.currentPostList);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllPostsThunk([]));
	}, []);

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
								<td className={forumStyle.titleTdStyle}>
									<Link to={`/forum/post=${post.postId}`}>{post.title}</Link>
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
