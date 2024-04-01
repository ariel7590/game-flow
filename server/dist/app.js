"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_router_1 = __importDefault(require("./api/routes/users/users.router"));
const posts_router_1 = __importDefault(require("./api/routes/posts/posts.router"));
const comments_router_1 = __importDefault(require("./api/routes/comments/comments.router"));
const ai_guide_router_1 = __importDefault(require("./api/routes/ai-guide/ai-guide.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.get('origin'),
    credentials: true,
}));
app.use((0, morgan_1.default)("combined"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//routers
app.use("/users", users_router_1.default);
app.use("/posts", posts_router_1.default);
app.use("/comments", comments_router_1.default);
app.use('/aiGuide', ai_guide_router_1.default);
app.get("/", (req, res) => {
    res.send("Works!");
});
exports.default = app;
