import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import usersRouter from "./routes-controllers/users/users.router";
import postsRouter from "./routes-controllers/posts/posts.router";
import commentsRouter from "./routes-controllers/comments/comments.router";

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173",
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
app.get("/", (req, res) => {
	res.send("Works!");
});

export default app;
