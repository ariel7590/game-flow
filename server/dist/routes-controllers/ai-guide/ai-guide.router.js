"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_guide_controller_1 = require("./ai-guide.controller");
const aiGuideRouter = express_1.default.Router();
aiGuideRouter.post('/', ai_guide_controller_1.httpGenerateGuide);
exports.default = aiGuideRouter;
