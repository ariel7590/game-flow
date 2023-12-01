import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpGetAllUsers,
	httpGetUserById,
	httpCreateNewUser,
	httpLogin,
	httpAuthenticate,
} from "./users.controller";

const usersRouter = express.Router();

usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/auth", verifyJWT, httpAuthenticate);
usersRouter.get("/:userId", httpGetUserById);
usersRouter.post("/signup", httpCreateNewUser);
usersRouter.post("/login", httpLogin);

export default usersRouter;
