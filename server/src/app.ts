import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173/",
		credentials: true,
	})
);
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
//routers
app.get("/", (req, res) => {
	res.send("Works!");
});

export default app;
