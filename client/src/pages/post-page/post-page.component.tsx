import React from "react";
import Post from "../../components/post/post.component";
import Comments from "../../components/comments/comments.component";

const pageStyle="flex flex-col justify-center items-center mt-5";

const PostPage = () => {
	return (
		<div className={pageStyle}>
			<Post />
			<Comments />
		</div>
	);
};

export default PostPage;
