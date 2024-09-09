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
import { ICurrentPost } from "../../redux/posts/posts.types";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Pagination from '@mui/material/Pagination';

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
			currentPost ? dispatch(exitPost()) : null;
		}

		initPostsState();
	}, [page]);

	const handlePostNavigation = (post: ICurrentPost) => {
		dispatch(enterPost(post));
		navigateToPage(`/forum/post/${post.postId}`, 1);
	};

	const handleNewPost = () => {
		isUserAuth ? navigate("/forum/new-post") : navigate("/login");
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
		<div
			id='page-container'
			className='flex justify-center pt-[25px] w-[100vw]'
		>
			<Stack spacing={2} className='w-[40%]'>
				{currentPostList?.map((post) => {
					return (
						<div key={post.postId}>
							<Paper
								className='cursor-pointer p-2'
								onClick={() => handlePostNavigation(post)}
							>
								<div>
									<span className='font-bold'>{post.gameName}</span> | &nbsp;
									{post.title}
								</div>
								<br />
								<div className="flex justify-between">
									<div>
										<CommentIcon className="mr-1" />
										<span className="mr-5">0 answers</span>
										<ThumbsUpDownIcon className="mr-2" />
										<span>0 answers</span>
									</div>
									<div>{post.publisher}</div>
								</div>
							</Paper>
						</div>
					);
				})}
			</Stack>
			<Pagination count={10} />
			{/* <div id="table-container" className="flex justify-center items-center flex-col w-[40%]">
				<button className="bg-[#3d403e] border-white self-end mb-2 hover:bg-[#939995]" onClick={handleNewPost}>
					New Post
				</button>
				<table className="w-[100%]">
					<thead>
						<tr>
							<th className={thStyle}>Title</th>
							<th className={thStyle}>By</th>
						</tr>
					</thead>
					<tbody>
						{currentPostList?.map((post) => {
							return (
								<tr key={post.postId}>
									<td
										className="border border-solid border-[white] cursor-pointer"
										onClick={() => handlePostNavigation(post)}
									>
										{post.gameName} | &nbsp;
										{post.title}
									</td>
									<td className="border border-solid border-[white] cursor-pointer text-center">{post.publisher}</td>
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
			</div> */}
		</div>
	);
};

export default Forum;
