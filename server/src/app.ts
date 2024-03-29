import express from "express";
import path from "path";
import config from 'config';
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import usersRouter from "./api/routes/users/users.router";
import postsRouter from "./api/routes/posts/posts.router";
import commentsRouter from "./api/routes/comments/comments.router";
import aiGuideRouter from "./api/routes/ai-guide/ai-guide.router";

const app = express();
app.use(
	cors({
		origin: config.get('origin'),
		credentials: true,
	})
);
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use('/aiGuide', aiGuideRouter);
app.get("/", (req, res) => {
	res.send("Works!");
});

export default app;
