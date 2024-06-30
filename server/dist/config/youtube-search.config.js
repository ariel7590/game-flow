"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtube = void 0;
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("config"));
exports.youtube = googleapis_1.google.youtube({
    version: "v3",
    auth: config_1.default.get("youtubeAPI")
});
