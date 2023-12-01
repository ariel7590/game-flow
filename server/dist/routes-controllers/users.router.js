"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_config_1 = require("../jwt/jwt.config");
const users_controller_1 = require("./users.controller");
const usersRouter = express_1.default.Router();
usersRouter.get("/", users_controller_1.httpGetAllUsers);
usersRouter.get("/auth", jwt_config_1.verifyJWT, users_controller_1.httpAuthenticate);
usersRouter.get("/:userId", users_controller_1.httpGetUserById);
usersRouter.post("/signup", users_controller_1.httpCreateNewUser);
usersRouter.post("/login", users_controller_1.httpLogin);
exports.default = usersRouter;
