import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { exitPost } from "../../redux/posts/posts.slice";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getPeginatedPostsThunk } from "../../redux/posts/posts.thunks";
import { enterPost } from "../../redux/posts/posts.slice";
import * as forumStyle from "./forum.tailwind";
import { ICurrentPost } from "../../redux/posts/posts.types";

const Forum = () => {
	const [params]=useSearchParams();
	const [page, setPage] = useState(+(params.get('page') as string) || 1);
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
			await dispatch(getPeginatedPostsThunk(page));
			if (currentPost) {
				dispatch(exitPost());
			}
			console.log(params);
		}

		initPostsState();
	}, [page]);

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

	const handleNewPage = (event: MouseEvent<HTMLDivElement>) => {
		if (event.currentTarget.id === "prev" && page > 1) {
			setPage((prevPage) => {
				const newPage = --prevPage;
				navigateToPage(newPage);
				return newPage;
			});
		}
		if (event.currentTarget.id === "next") {
			setPage((prevPage) => {
				const newPage = ++prevPage;
				navigateToPage(newPage);
				return newPage;
			});
		}
	};

	const navigateToPage = (newPage: number) => {
		navigate({
			pathname: "/forum",
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
						{posts?.map((post) => {
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
						className='cursor-pointer'
						onClick={(e) => handleNewPage(e)}
					>
						{"<"}
					</div>
					<div>{page}</div>
					<div
						id='next'
						className='cursor-pointer'
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
