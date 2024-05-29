import { RequestHandler } from "express";
import transcriptYoutubeVideo from "../../services/youtube-transcript.service";
import searchOnYoutube from "../../services/youtube-search.service";

export const httpGenerateGuide: RequestHandler = async (req, res) => {
	try {
		const prompt = req.body as string;
		// const transcript = await transcriptYoutubeVideo("https://www.youtube.com/watch?v=AtgAzhxY4Cw");
		// !transcript
		// 	? res.status(500).json({ error: "Cannot transcript the video" })
		// 	: res.status(200).json(transcript);
		const searchResults = await searchOnYoutube("devil may cry");
		!searchResults
			? res.status(500).json({ error: "Cannot transcript the video" })
			: res.status(200).json(searchResults);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
