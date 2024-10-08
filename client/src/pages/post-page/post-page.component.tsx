import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Post from "../../components/post/post.component";
import Comments from "../../components/comments/comments.component";
import NewComment from "../new-comment/new-comment.component";

const pageStyle = "flex flex-col justify-center items-center mt-5";

const PostPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();

	const handleClick = () => {
		navigate({
			pathname: `${location.pathname}/new-comment`,
			search: `?${params.get("page") as string}`
		})
		// navigate(`${location.pathname}/new-comment`);
	};
	return (
		<div className={pageStyle}>
			<Post />
			<Comments />
			<NewComment />
			{/* <div className='w-[50%]'>
				<button
					className='bg-[#3d403e] border-white mb-2 hover:bg-[#939995]'
					onClick={handleClick}
				>
					New Comment
				</button>
			</div> */}
		</div>
	);
};

export default PostPage;
