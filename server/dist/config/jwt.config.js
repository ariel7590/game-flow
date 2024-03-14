"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = exports.jwtExp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
dotenv_1.default.config();
exports.jwtExp = 30 * 24 * 60 * 60;
function createJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.default.get("JWTSecret"), {
        expiresIn: exports.jwtExp,
    });
}
exports.createJWT = createJWT;
function verifyJWT(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(400).json({
            auth: false,
            message: "No token found!",
        });
    }
    jsonwebtoken_1.default.verify(token, config_1.default.get("JWTSecret"), (err, decoded) => {
        if (err) {
            return res.status(403).json({
                auth: false,
                message: "Not authorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
}
exports.verifyJWT = verifyJWT;
