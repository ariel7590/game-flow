"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpSignOut = exports.httpAuthenticate = exports.httpLogin = exports.httpCreateNewUser = exports.httpGetUserById = exports.httpGetAllUsers = void 0;
const jwt_config_1 = require("../../../config/jwt.config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_da_1 = require("../../data-access/users/users.da");
const httpGetAllUsers = async (req, res) => {
    // this function is for testing only, I can delete it later
    const users = await (0, users_da_1.getAllUsers)();
    return res.status(200).json(users);
};
exports.httpGetAllUsers = httpGetAllUsers;
const httpGetUserById = async (req, res) => {
    // this function is for testing only, I can delete it later
    const userId = Number(req.params.userId);
    if (!userId) {
        return res.status(400).json({
            error: "Invalid user id",
        });
    }
    const user = await (0, users_da_1.getUserById)(userId);
    if (!user) {
        return res.status(404).json({
            error: "user not found",
        });
    }
    return res.status(200).json(user);
};
exports.httpGetUserById = httpGetUserById;
const httpCreateNewUser = async (req, res) => {
    const user = req.body;
    const userWithEmail = await (0, users_da_1.findUserByEmail)(user.email);
    if (userWithEmail) {
        return res.status(400).json({
            message: "Account with this email already exists!",
        });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(user.password, salt);
    const hashedPassUser = {
        ...user,
        password: hashedPassword,
        salt: salt,
    };
    const userId = await (0, users_da_1.createNewUser)(hashedPassUser);
    const token = (0, jwt_config_1.createJWT)({ email: user.email, id: userId });
    res.cookie("jwt", token, { httpOnly: true, maxAge: jwt_config_1.jwtExp * 1000 });
    return res.status(201).json({
        auth: true,
        userId: userId,
        userName: user.userName,
    });
};
exports.httpCreateNewUser = httpCreateNewUser;
const httpLogin = async (req, res) => {
    const credentials = req.body;
    let user;
    if (credentials.userName) {
        user = await (0, users_da_1.isUserExists)(credentials.userName);
    }
    else if (credentials.email) {
        user = await (0, users_da_1.findUserByEmail)(credentials.email);
    }
    else {
        user = null;
    }
    if (!user) {
        return res.status(404).json({
            message: "User not found!",
        });
    }
    const match = await bcrypt_1.default.compare(credentials.password, user.password);
    if (!match) {
        return res.status(404).json({
            message: "Incorrect password!",
        });
    }
    const token = (0, jwt_config_1.createJWT)({ email: user.email, id: user.userId });
    res.cookie("jwt", token, { httpOnly: true, maxAge: jwt_config_1.jwtExp * 1000 });
    return res.status(200).json({
        auth: true,
        userId: user.userId,
        userName: user.userName,
    });
};
exports.httpLogin = httpLogin;
const httpAuthenticate = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({
            auth: false,
            message: "Invalid user id",
        });
    }
    const user = await (0, users_da_1.getUserById)(userId);
    if (!user) {
        return res.status(404).json({
            auth: false,
            message: "user not found",
        });
    }
    return res.status(200).json({
        userId: user.userId,
        auth: true,
        userName: user.userName,
    });
};
exports.httpAuthenticate = httpAuthenticate;
const httpSignOut = (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    return res.status(200).json({
        auth: false
    });
};
exports.httpSignOut = httpSignOut;
