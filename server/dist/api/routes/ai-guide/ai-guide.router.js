"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_guide_controller_1 = require("../../controllers/ai-guide/ai-guide.controller");
const ai_guide_validations_1 = require("../../validations/ai-guide/ai-guide.validations");
const validate_resourse_middleware_1 = require("../../middlewares/validate-resourse.middleware");
const aiGuideRouter = express_1.default.Router();
aiGuideRouter.post('/', (0, validate_resourse_middleware_1.validate)(ai_guide_validations_1.validateGenerateGuide), ai_guide_controller_1.httpGenerateGuide);
exports.default = aiGuideRouter;
