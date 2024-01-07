import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as commentsStyle from "./comments.tailwind";
import { getRelevantCommentsThunk } from "../../redux/comments/comments.thunks";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteCommentThunk } from "../../redux/comments/comments.thunks";
import { enterEditComment } from "../../redux/comments/comments.slice";
import { Button } from "@mui/material";
import AlertDialog from "../mui/alert-dialog.component";
import { IComment } from "../../redux/comments/comments.types";
import { ICurrentUser } from "../../redux/users/users.types";

const Comments = () => {
	const postId = useSelector(
		(state: RootState) => state.posts.currentPost?.postId
	);
	const comments = useSelector(
		(state: RootState) => state.comments.currentCommentsList
	);
	const userId = useSelector(
		(state: RootState) => (state.users.currentUser as ICurrentUser).userId
	);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		async function getRelevantComments() {
			if (postId) await dispatch(getRelevantCommentsThunk(postId!));
		}
		getRelevantComments();
	}, [dispatch, postId]);

	const handleDelete = (commentId: string) => {
		console.log(commentId);
		dispatch(deleteCommentThunk(commentId));
	};

	const handleEdit = (comment: IComment) => {
		dispatch(enterEditComment(comment));
		navigate(`${location.pathname}/edit-comment/${comment.commentId}`);
	};
	return (
		<div className='w-[50%]'>
			{comments &&
				comments.map((comment) => (
					<div key={comment.commentId} className={commentsStyle.container}>
						<div className='flex flex-col justify-center'>
							<div className={commentsStyle.voteUp} />
							<div className={commentsStyle.rank}>{comment.rank}</div>
							<div className={commentsStyle.votedown} />
						</div>
						<div className={commentsStyle.content}>
							<div className={commentsStyle.body}>{comment.body}</div>
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
				))}
		</div>
	);
};

export default Comments;
