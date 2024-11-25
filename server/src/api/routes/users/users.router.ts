import express from "express";
import { verifyJWT } from "../../../config/jwt.config";
import {
	httpGetAllUsers,
	httpGetUserById,
	httpCreateNewUser,
	httpLogin,
	httpAuthenticate,
    httpGoogleAuthenticate,
    httpGoogleAuthenticateCallback,
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
usersRouter.get("/auth/google", httpGoogleAuthenticate);
usersRouter.get('/auth/google/callback', httpGoogleAuthenticateCallback);
usersRouter.get("/signout", verifyJWT, validate(validateSignOut), httpSignOut);
usersRouter.get("/:userId", httpGetUserById);
usersRouter.post("/signup", validate(validateCreateNewUser), httpCreateNewUser);
usersRouter.post("/login", validate(validateLogin), httpLogin);

// Routes for OAuth

// Logout route
// app.get('/logout', (req: Request, res: Response) => {
//     req.logout((err) => {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

// Profile route
// app.get('/profile', (req: Request, res: Response) => {
//     if (req.user) {
//         res.send(req.user);  // Protected route
//     } else {
//         res.redirect('/');
//     }
// });


export default usersRouter;
