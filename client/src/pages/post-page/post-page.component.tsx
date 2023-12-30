import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Post from "../../components/post/post.component";
import Comments from "../../components/comments/comments.component";

const pageStyle = "flex flex-col justify-center items-center mt-5";

const PostPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		navigate(`${location.pathname}/new-comment`);
	}
	return (
		<div className={pageStyle}>
			<Post />
			<Comments />
			<div className="w-[50%]">
				<button className="bg-[#3d403e] border-white mb-2 hover:bg-[#939995]" onClick={handleClick}>New Comment</button>
			</div>
		</div>
	);
};

export default PostPage;
