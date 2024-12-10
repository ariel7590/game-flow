"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    userId: {
        type: Number,
        required: function () {
            return !this.googleId;
        }
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    salt: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
});
exports.userModel = mongoose_1.default.model("Users", usersSchema);
