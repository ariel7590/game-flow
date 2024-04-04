import express from 'express';
import aiGuideRouter from './ai-guide/ai-guide.router';
import commentsRouter from './comments/comments.router';
import postsRouter from './posts/posts.router';
import usersRouter from './users/users.router';

const routers=express.Router();

routers.use("/users", usersRouter);
routers.use("/posts", postsRouter);
routers.use("/comments", commentsRouter);
routers.use('/aiGuide', aiGuideRouter);
routers.get("/", (req, res) => {
	res.send("Works!");
});

export default routers;