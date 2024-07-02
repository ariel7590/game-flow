"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGPTRewrite = void 0;
const chatGPT_config_1 = require("../../config/chatGPT.config");
async function chatGPTRewrite() {
    try {
        return await chatGPT_config_1.openai.chat.completions.create({
            messages: [{ role: "user", content: "Say this is a test" }],
            model: "gpt-3.5-turbo",
        });
    }
    catch (error) {
        throw new Error("ChatGPT Error: " + error);
    }
}
exports.chatGPTRewrite = chatGPTRewrite;
