"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const cloudinary_1 = require("./services/cloudinary");
const PORT = process.env.PORT || 8000;
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
async function startServer() {
    await (0, mongo_1.mongoConnect)();
    await (0, cloudinary_1.cloudinaryConfig)();
    server.listen(PORT, () => {
        console.log("Listening to port ", PORT);
    });
}
startServer();
