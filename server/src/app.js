const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

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

module.exports = app;
