"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomStringId = void 0;
const crypto_1 = require("crypto");
function generateRandomStringId(length) {
    const idRandomBytes = (0, crypto_1.randomBytes)(length);
    const randomString = idRandomBytes.toString("hex");
    return randomString;
}
exports.generateRandomStringId = generateRandomStringId;
