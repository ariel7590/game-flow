"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_guide_router_1 = __importDefault(require("./ai-guide/ai-guide.router"));
const comments_router_1 = __importDefault(require("./comments/comments.router"));
const posts_router_1 = __importDefault(require("./posts/posts.router"));
const users_router_1 = __importDefault(require("./users/users.router"));
const routers = express_1.default.Router();
routers.use("/users", users_router_1.default);
routers.use("/posts", posts_router_1.default);
routers.use("/comments", comments_router_1.default);
routers.use('/aiGuide', ai_guide_router_1.default);
routers.get("/", (req, res) => {
    res.send("Works!");
});
exports.default = routers;
