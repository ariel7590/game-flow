"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_config_1 = require("../../../config/jwt.config");
const users_controller_1 = require("../../controllers/users/users.controller");
const validate_resourse_middleware_1 = require("../../middlewares/validate-resourse.middleware");
const users_validations_1 = require("../../validations/users/users.validations");
const usersRouter = express_1.default.Router();
usersRouter.get("/", users_controller_1.httpGetAllUsers);
usersRouter.get("/auth", jwt_config_1.verifyJWT, (0, validate_resourse_middleware_1.validate)(users_validations_1.validateAuthenticate), users_controller_1.httpAuthenticate);
usersRouter.get("/auth/google", users_controller_1.httpGoogleAuthenticate);
usersRouter.get('/auth/google/callback', users_controller_1.httpGoogleAuthenticateCallback);
usersRouter.get("/signout", jwt_config_1.verifyJWT, (0, validate_resourse_middleware_1.validate)(users_validations_1.validateSignOut), users_controller_1.httpSignOut);
usersRouter.get("/:userId", users_controller_1.httpGetUserById);
usersRouter.post("/signup", (0, validate_resourse_middleware_1.validate)(users_validations_1.validateCreateNewUser), users_controller_1.httpCreateNewUser);
usersRouter.post("/login", (0, validate_resourse_middleware_1.validate)(users_validations_1.validateLogin), users_controller_1.httpLogin);
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
exports.default = usersRouter;
