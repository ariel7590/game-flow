import { openai } from "../../config/chatGPT.config";

export async function chatGPTRewrite(prompt: string) {
	try {
		return await openai.chat.completions.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			model: "gpt-4o",
		});
	} catch (error) {
		throw new Error("ChatGPT Error: " + error);
	}
}
