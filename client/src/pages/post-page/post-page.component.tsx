import Post from "../../components/post/post.component";
import Comments from "../../components/comments/comments.component";
import NewComment from "../new-comment/new-comment.component";

const pageStyle = "flex flex-col justify-center items-center mt-5";

const PostPage = () => {
	return (
		<div className={pageStyle}>
			<Post />
			<Comments />
			<NewComment />
		</div>
	);
};

export default PostPage;
