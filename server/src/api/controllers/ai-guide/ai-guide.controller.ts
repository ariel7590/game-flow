import { RequestHandler } from "express";
import transcriptYoutubeVideo from "../../services/youtube-transcript.service";
import searchOnYoutube from "../../services/youtube-search.service";
import { TranscriptResponse } from "youtube-transcript";

export const httpGenerateGuide: RequestHandler = async (req, res) => {
	try {
		const prompt = req.body.prompt as string;
		console.log(prompt);
		const videoIDs: string[] = [];
		const searchResults = await searchOnYoutube(prompt);
		searchResults.data.items?.map((item) =>
			videoIDs.push(item.id?.videoId as string)
		);
		let transcriptResults: TranscriptResponse[] = [];
		for (let i = 0; i < videoIDs.length; i++) {
			transcriptResults = await transcriptYoutubeVideo(videoIDs[i]);
			if (transcriptResults.length > 0) {
				break;
			}
		}
		let transcript: string = "";
		transcriptResults.map((result) => {
			transcript = transcript + "\n" + result.text;
		});
		!transcript
			? res.status(500).json({ error: "Cannot transcript the video" })
			: res.status(200).json(transcript);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
