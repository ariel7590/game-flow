"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    userId: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dwobsryyr/image/upload/f_auto,q_auto/v1/faces-and-books/qhvyxsejupgbcrderwv4",
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});
exports.userModel = mongoose_1.default.model("Users", usersSchema);
