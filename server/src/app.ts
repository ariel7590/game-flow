import express from "express";
import path from "path";
import config from 'config';
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
import routers from "./api/routes";

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
app.use(session({
	secret: config.get('sessionSecret'),
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);

export default app;
