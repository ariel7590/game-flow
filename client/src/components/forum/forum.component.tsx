import React, { useEffect, useState, ChangeEvent } from "react";
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
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

	const navigateToPage = (path: string, newPage: number) => {
		navigate({
			pathname: path,
			search: `?${createSearchParams({ page: newPage.toString() })}`,
		});
	};

	const handlePagination = (e: ChangeEvent, page: number) => {
		setPage(() => {
			const newPage = page;
			navigateToPage("/forum", newPage);
			return newPage;
		});
	};

	return (
		<div
			id='page-container'
			className='flex flex-col items-center pt-[25px] w-[100%]'
		>
			<div className='flex justify-between items-center w-[40%]'>
				<Pagination
					count={totalNumOfPages}
					color='primary'
					page={+location.search[location.search.length-1] || 1}
					onChange={(e, page) => handlePagination(e as ChangeEvent, page)}
				/>
				<Button
					variant='contained'
					className='bg-[#f09b1c] hover:bg-[#fcba2b] min-w-[115px] px-2'
					onClick={handleNewPost}
				>
					<AddIcon />
					<span className='pt-0.5 pl-0.5'>New Post</span>
				</Button>
			</div>
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
								<div className='flex justify-between'>
									<div>
										<CommentIcon className='mr-1' />
										<span className='mr-5'>0 answers</span>
										<ThumbsUpDownIcon className='mr-2' />
										<span>0 answers</span>
									</div>
									<div>{post.publisher}</div>
								</div>
							</Paper>
						</div>
					);
				})}
			</Stack>
			<div className='flex justify-between items-center w-[40%]'>
				<Button
					variant='contained'
					className='bg-[#f09b1c] hover:bg-[#fcba2b] min-w-[115px] px-2'
					onClick={handleNewPost}
				>
					<AddIcon />
					<span className='pt-0.5 pl-0.5'>New Post</span>
				</Button>
				<Pagination
					count={totalNumOfPages}
					color='primary'
					page={+location.search[location.search.length-1] || 1}
					onChange={(e, page) => handlePagination(e as ChangeEvent, page)}
				/>
			</div>
		</div>
	);
};

export default Forum;
