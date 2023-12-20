import React from "react";
import Post from "../../components/post/post.component";
import Comments from "../../components/comments/comments.component";

const PostPage = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<Post />
			<Comments />
		</div>
	);
};

export default PostPage;
