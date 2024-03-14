"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const mongo_connect_1 = require("./utils/mongo-connect");
const cloudinary_1 = require("./config/cloudinary");
const PORT = config_1.default.get('port');
const server = http_1.default.createServer(app_1.default);
async function startServer() {
    await (0, mongo_connect_1.mongoConnect)();
    await (0, cloudinary_1.cloudinaryConfig)();
    server.listen(PORT, () => {
        console.log("Listening to port ", PORT);
    });
}
startServer();
