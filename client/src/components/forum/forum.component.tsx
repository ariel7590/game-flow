import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { exitPost } from "../../redux/posts/posts.slice";
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { getPeginatedPostsThunk } from "../../redux/posts/posts.thunks";
import { enterPost } from "../../redux/posts/posts.slice";
import * as forumStyle from "./forum.tailwind";
import { ICurrentPost } from "../../redux/posts/posts.types";

const Forum = () => {
	const [params] = useSearchParams();
	const [page, setPage] = useState(+(params.get("page") as string) || 1);
	const { currentPostList, currentPost, totalNumOfPages } = useSelector(
		(state: RootState) => state.posts
	);
	const isUserAuth = useSelector(
		(state: RootState) => state.users.currentUser.auth
	);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		async function initPostsState() {
			await dispatch(getPeginatedPostsThunk(page));
			currentPost
				? dispatch(exitPost())
				: null;
		}

		initPostsState();
	}, [page]);

	const handlePostNavigation = (post: ICurrentPost) => {
		dispatch(enterPost(post));
		navigateToPage(`/forum/post/${post.postId}`, 1);
	};

	const handleNewPost = () => {
		isUserAuth
			? navigate("/forum/new-post")
			: navigate("/login");
	};

	const handleNewPage = (event: MouseEvent<HTMLDivElement>) => {
		event.currentTarget.id === "prev" && page > 1
			? setPage((prevPage) => {
				const newPage = --prevPage;
				navigateToPage("/forum", newPage);
				return newPage;
			})
			: null;
			event.currentTarget.id === "next" && page < totalNumOfPages
			? setPage((prevPage) => {
				const newPage = ++prevPage;
				navigateToPage("/forum", newPage);
				return newPage;
			})
			: null;
	};

	const navigateToPage = (path: string, newPage: number) => {
		navigate({
			pathname: path,
			search: `?${createSearchParams({ page: newPage.toString() })}`,
		});
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
						{currentPostList?.map((post) => {
							return (
								<tr key={post.postId}>
									<td
										className={forumStyle.titleTdStyle}
										onClick={() => handlePostNavigation(post)}
									>
										{post.gameName} | &nbsp;
										{post.title}
									</td>
									<td className={forumStyle.byTdStyle}>{post.publisher}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className='flex justify-between w-24'>
					<div
						id='prev'
						className={
							page !== 1
								? "cursor-pointer text-white"
								: "pointer-default text-gray-500"
						}
						onClick={(e) => handleNewPage(e)}
					>
						{"<"}
					</div>
					<div>{page}</div>
					<div
						id='next'
						className={
							page < totalNumOfPages
								? "cursor-pointer text-white"
								: "pointer-default text-gray-500"
						}
						onClick={(e) => handleNewPage(e)}
					>
						{">"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forum;
