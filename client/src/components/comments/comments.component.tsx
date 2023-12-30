import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsStyle from "./comments.tailwind";
import { getRelevantCommentsThunk } from "../../redux/comments/comments.thunks";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteCommentThunk } from "../../redux/comments/comments.thunks";
import AlertDialog from "../mui/alert-dialog.component";

const Comments = () => {
	const postId = useSelector(
		(state: RootState) => state.posts.currentPost?.postId
	);
	const comments = useSelector(
		(state: RootState) => state.comments.currentCommentsList
	);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		async function getRelevantComments() {
			if (postId) await dispatch(getRelevantCommentsThunk(postId!));
		}
		getRelevantComments();
	}, [dispatch, postId]);

	const handleDelete = (commentId: string) => {
		console.log(commentId)
		dispatch(deleteCommentThunk(commentId));
	}
	return (
		<div className="w-[50%]">
			{comments && comments.map((comment) => (
				<div key={comment.commentId} className={commentsStyle.container}>
					<div className="flex flex-col justify-center">
						<div className={commentsStyle.voteUp} />
						<div className={commentsStyle.rank}>{comment.rank}</div>
						<div className={commentsStyle.votedown} />
					</div>
					<div className={commentsStyle.content}>
						<div className={commentsStyle.body}>{comment.body}</div>
						<div>
							<AlertDialog
								btnClassName={commentsStyle.commentDeleteEdit}
								title='Delete a comment'
								content='Are you sure you want to delete this comment?'
								onAgree={() => handleDelete(comment.commentId)}
							>Delete</AlertDialog>
							<div className={commentsStyle.publisher}>by: {comment.publisher}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Comments;
