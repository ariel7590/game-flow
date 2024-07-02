import { openai } from "../../config/chatGPT.config";

export async function chatGPTRewrite() {
	try {
		return await openai.chat.completions.create({
			messages: [{ role: "user", content: "Say this is a test" }],
			model: "gpt-3.5-turbo",
		});
	} catch (error) {
		throw new Error("ChatGPT Error: " + error);
	}
}
