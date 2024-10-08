import express from "express";
import { verifyJWT } from "../../../config/jwt.config";
import {
	httpGetAllUsers,
	httpGetUserById,
	httpCreateNewUser,
	httpLogin,
	httpAuthenticate,
	httpSignOut
} from "../../controllers/users/users.controller";
import {validate} from '../../middlewares/validate-resourse.middleware';
import { validateCreateNewUser,
	 validateAuthenticate,
	 validateSignOut,  
	 validateLogin,
	} from "../../validations/users/users.validations";

const usersRouter = express.Router();

usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/auth", verifyJWT, validate(validateAuthenticate), httpAuthenticate);
usersRouter.get("/signout", verifyJWT, validate(validateSignOut), httpSignOut);
usersRouter.get("/:userId", httpGetUserById);
usersRouter.post("/signup", validate(validateCreateNewUser), httpCreateNewUser);
usersRouter.post("/login", validate(validateLogin), httpLogin);


export default usersRouter;
