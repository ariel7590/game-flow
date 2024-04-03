import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useNavigate,
	useLocation,
	useSearchParams,
	createSearchParams,
} from "react-router-dom";
import * as commentsStyle from "./comments.tailwind";
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

const Comments = () => {
	const [params] = useSearchParams();

	const [page, setPage] = useState(+(params.get("page") as string) || 1);

	const postId = useSelector(
		(state: RootState) => state.posts.currentPost?.postId
	);
	const comments = useSelector(
		(state: RootState) => state.comments.currentCommentsList
	);
	const userId = useSelector(
		(state: RootState) => (state.users.currentUser as ICurrentUser).userId
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
		event.currentTarget.id === "voteUp"
			? dispatch(
				rankCommentThunk({
					commentId: comment.commentId,
					newRank: comment.rank + 1,
					rankerId: userId,
				})
			)
			: null;
		event.currentTarget.id === "voteDown"
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
				<div key={comment?.commentId} className={commentsStyle.container}>
					<div className='flex flex-col justify-center'>
						<div
							id='voteUp'
							className={`${commentsStyle.voteUp} ${comment?.whoRanked?.includes(userId)
								? commentsStyle.votedUp
								: null
								}`}
							onClick={(e) => handleRank(e, comment)}
						/>
						<div className={commentsStyle.rank}>{comment.rank}</div>
						<div
							id='voteDown'
							className={`${commentsStyle.votedown} ${comment?.whoRanked?.includes(userId)
								? commentsStyle.votedDown
								: null
								}`}
							onClick={(e) => handleRank(e, comment)}
						/>
					</div>
					<div className={commentsStyle.content}>
						<div className={commentsStyle.body}>{comment.body}</div>
						<img className="p-5" src={comment.media[0]} alt={comment.media[0]} />
						<div className='flex justify-between pl-[10px]'>
							{comment.publisherId === userId ? (
								<div>
									<AlertDialog
										btnClassName={commentsStyle.commentDeleteEdit}
										title='Delete a comment'
										content='Are you sure you want to delete this comment?'
										onAgree={() => handleDelete(comment.commentId)}
									>
										Delete
									</AlertDialog>
									&nbsp;
									<Button
										variant='text'
										className={commentsStyle.commentDeleteEdit}
										onClick={() => handleEdit(comment)}
									>
										Edit
									</Button>
								</div>
							) : null}
							<div className={commentsStyle.publisher}>
								by: {comment.publisher}
							</div>
						</div>
					</div>
				</div>
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
