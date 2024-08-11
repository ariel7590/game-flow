import OpenAI from "openai";
import config from "config";

export const openai = new OpenAI({
    apiKey: config.get("chatGPT_API")
})
