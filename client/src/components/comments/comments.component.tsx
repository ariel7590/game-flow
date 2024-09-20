import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useNavigate,
	useLocation,
	useSearchParams,
	createSearchParams,
} from "react-router-dom";
import {
	getRelevantCommentsThunk,
	rankCommentThunk,
} from "../../redux/comments/comments.thunks";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteCommentThunk } from "../../redux/comments/comments.thunks";
import { enterEditComment } from "../../redux/comments/comments.slice";
import { Button } from "@mui/material";
import AlertDialog from "../mui/alert-dialog.component";
import { IComment } from "../../redux/comments/comments.types";
import { ICurrentUser } from "../../redux/users/users.types";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Comments = () => {
	const [params] = useSearchParams();

	const [page, setPage] = useState(+(params.get("page") as string) || 1);

	const postId = useSelector(
		(state: RootState) => state.posts.currentPost?.postId
	);
	const comments = useSelector(
		(state: RootState) => state.comments.currentCommentsList
	);
	const { userId, auth } = useSelector(
		(state: RootState) => state.users.currentUser as ICurrentUser
	);
	const totalPages = useSelector((state: RootState) => state.comments.pages);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		async function getRelevantComments() {
			postId
				? await dispatch(getRelevantCommentsThunk({ postId: postId!, page }))
				: null;
		}
		getRelevantComments();
	}, [dispatch, postId, page]);

	const handleDelete = (commentId: string) => {
		console.log(commentId);
		dispatch(deleteCommentThunk(commentId));
	};

	const handleEdit = (comment: IComment) => {
		dispatch(enterEditComment(comment));
		navigate(`${location.pathname}/edit-comment/${comment.commentId}`);
	};

	const handleNewPage = (event: MouseEvent<HTMLDivElement>) => {
		event.currentTarget.id === "prev" && page > 1
			? setPage((prevPage) => {
				const newPage = --prevPage;
				navigateToPage(newPage);
				return newPage;
			})
			: null;
		event.currentTarget.id === "next" && page < totalPages
			? setPage((prevPage) => {
				const newPage = ++prevPage;
				navigateToPage(newPage);
				return newPage;
			})
			: null;
	};

	const navigateToPage = (newPage: number) => {
		navigate({
			pathname: `/forum/post/${postId}`,
			search: `?${createSearchParams({ page: newPage.toString() })}`,
		});
	};

	const handleRank = (event: MouseEvent<HTMLDivElement>, comment: IComment) => {
		event.currentTarget.id === "voteUp" && comment.publisherId !== userId
			? dispatch(
				rankCommentThunk({
					commentId: comment.commentId,
					newRank: comment.rank + 1,
					rankerId: userId,
				})
			)
			: null;
		event.currentTarget.id === "voteDown" && comment.publisherId !== userId
			? dispatch(
				rankCommentThunk({
					commentId: comment.commentId,
					newRank: comment.rank - 1,
					rankerId: userId,
				})
			)
			: null;
	};

	return (
		<div className='w-[50%] flex flex-col items-center'>
			{comments?.map((comment) => (
				<Paper key={comment?.commentId} className="w-[100%] flex p-2 mb-3">
					<div className='flex flex-col justify-center'>
						<div
							id='voteUp'
							onClick={(e) => handleRank(e, comment)}
						>
							<ThumbUpIcon
								className={
									comment?.whoRanked?.includes(userId)
										|| comment.publisherId === userId
										|| !auth
										?
										"text-[#696b6a] cursor default"
										:
										"text-black cursor-pointer"
								} />
						</div>
						<div className="text-[36px] ml-[7px]">{comment.rank}</div>
						<div
							id='voteDown'
							onClick={(e) => handleRank(e, comment)}
						>
							<ThumbDownIcon
								className={
									comment?.whoRanked?.includes(userId)
										|| comment.publisherId === userId
										|| !auth
										?
										"text-[#696b6a] cursor default"
										:
										"text-black cursor-pointer"
								}
							/>
						</div>
					</div>
					<div className="w-[100%] flex flex-col justify-between">
						<div className="text-center">{comment.body}</div>
						<img className="p-5" src={comment.media[0]} alt={comment.media[0]} />
						<div className='flex justify-between pl-[10px]'>
							{comment.publisherId === userId ? (
								<div>
									<AlertDialog
										btnClassName='cursor-pointer font-normal font-[400] focus:outline-none normal-case p-0 min-w-[40px]'
										title='Delete a comment'
										content='Are you sure you want to delete this comment?'
										onAgree={() => handleDelete(comment.commentId)}
									>
										<DeleteIcon className="text-black" />
									</AlertDialog>
									&nbsp;
									<Button
										variant='text'
										className='cursor-pointer font-normal font-[400] focus:outline-none normal-case p-0 min-w-[40px]'
										onClick={() => handleEdit(comment)}
									>
										<EditNoteIcon className="text-black" />
									</Button>
								</div>
							) : null}
							<div className="text-end">
								by: {comment.publisher}
							</div>
						</div>
					</div>
				</Paper>
			))}
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
				<div>
					{page} of {totalPages}
				</div>
				<div
					id='next'
					className={
						page < totalPages
							? "cursor-pointer text-white"
							: "pointer-default text-gray-500"
					}
					onClick={(e) => handleNewPage(e)}
				>
					{">"}
				</div>
			</div>
		</div>
	);
};

export default Comments;
