import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsStyle from "./comments.tailwind";
import { getRelevantCommentsThunk } from "../../redux/comments/comments.thunks";
import { AppDispatch, RootState } from "../../redux/store";

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

	return (
		<div>
			{comments && comments.map((comment) => (
				<div key={comment.commentId} className={commentsStyle.container}>
					<div className={commentsStyle.rank}>{comment.rank}</div>
					<div className={commentsStyle.content}>
						<div className={commentsStyle.body}>{comment.body}</div>
						<div className={commentsStyle.publisher}>by: {comment.publisher}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Comments;
