import { RequestHandler } from "express";
import { YoutubeTranscript } from "youtube-transcript";

export const httpGenerateGuide: RequestHandler = async (req, res) => {
	try {
		const prompt = req.body as string;
		const transcript = await YoutubeTranscript.fetchTranscript(
			"https://www.youtube.com/watch?v=AtgAzhxY4Cw"
		);
		if (!transcript) {
			return res.status(500).json({
				error: "Cannot transcript the video",
			});
		}
		return res.status(200).json(transcript);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
