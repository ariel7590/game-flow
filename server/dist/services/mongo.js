"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
});
async function mongoConnect() {
    await mongoose_1.default.connect(process.env.MONGO_URL);
}
exports.mongoConnect = mongoConnect;
async function mongoDisconnect() {
    await mongoose_1.default.disconnect();
}
exports.mongoDisconnect = mongoDisconnect;
