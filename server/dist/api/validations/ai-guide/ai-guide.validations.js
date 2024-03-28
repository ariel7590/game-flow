"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGenerateGuide = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateGenerateGuide = joi_1.default.object({
    body: joi_1.default.object({
        prompt: joi_1.default.string().required()
    }),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional()
});
