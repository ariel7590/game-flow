import React, { useState, useEffect } from "react";
import * as forumStyle from "./forum.tailwind";
import axios from "axios";

type postList = {
	postId: string;
	creatorId: number;
	title: string;
	body: string;
	media: string;
};
const Forum = () => {
	const [posts, setPosts] = useState<postList[]>();

	useEffect(() => {
		function zibi() {
			axios({
				method: "get",
				url: "http://localhost:8000/posts/",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((result) => {
					console.log(result.data);
					setPosts(result.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		zibi();
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
								<td className={forumStyle.titleTdStyle}>{post.title}</td>
								<td className={forumStyle.byTdStyle}>{post.creatorId}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Forum;
