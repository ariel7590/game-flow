"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_router_1 = __importDefault(require("./routes-controllers/users/users.router"));
const posts_router_1 = __importDefault(require("./routes-controllers/posts/posts.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, morgan_1.default)("combined"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//routers
app.use("/users", users_router_1.default);
app.use("/posts", posts_router_1.default);
app.get("/", (req, res) => {
    res.send("Works!");
});
exports.default = app;
