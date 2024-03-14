import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpGetAllUsers,
	httpGetUserById,
	httpCreateNewUser,
	httpLogin,
	httpAuthenticate,
	httpSignOut
} from "../../controllers/users/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/auth", verifyJWT, httpAuthenticate);
usersRouter.get("/signout", verifyJWT,httpSignOut);
usersRouter.get("/:userId", httpGetUserById);
usersRouter.post("/signup", httpCreateNewUser);
usersRouter.post("/login", httpLogin);


export default usersRouter;
