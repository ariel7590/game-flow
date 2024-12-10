"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignOut = exports.validateAuthenticate = exports.validateLogin = exports.validateCreateNewUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateNewUser = joi_1.default.object({
    body: joi_1.default.object({
        userName: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
    }),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional(),
});
exports.validateLogin = joi_1.default.object({
    body: joi_1.default.object({
        userName: joi_1.default.string().allow("").optional(),
        email: joi_1.default.string().email().allow("").optional(),
        password: joi_1.default.string().required(),
    }).custom((value, helpers) => {
        if (!value.userName && !value.email) {
            return helpers.error('any.required');
        }
        return value;
    }, 'User Identification'),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional(),
});
exports.validateAuthenticate = joi_1.default.object({
    userId: joi_1.default.alternatives().try(joi_1.default.number(), joi_1.default.string()).required(),
    body: joi_1.default.object(),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
});
exports.validateSignOut = joi_1.default.object({
    userId: joi_1.default.number().required(),
    body: joi_1.default.object(),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
});
