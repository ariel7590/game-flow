import { RequestHandler } from "express";
import transcriptYoutubeVideo from "../../services/youtube-transcript.service";
import searchOnYoutube from "../../services/youtube-search.service";
import { TranscriptResponse } from "youtube-transcript";
import { chatGPTRewrite } from "../../services/chatGPT.service";

export const httpGenerateGuide: RequestHandler = async (req, res) => {
	try {
		const prompt = req.body.prompt as string;
		const videoIDs: string[] = [];
		const searchResults = await searchOnYoutube(prompt);
		if (!searchResults)
			res
				.status(500)
				.json({ error: "Something is wrong with the video searching!" });
		searchResults.data.items?.map((item) =>
			videoIDs.push(item.id?.videoId as string)
		);
		let transcriptResults: TranscriptResponse[] | undefined;
		/* 
		******************************************************************************************************************************
		I have 2 ideas for what do to if I don't find a video with a script
		a. just go straight to the chatGPT and create a guide without a script - this is what I did here
		b. search in a loop a video with a script - which I started to make here, hence the for loop, this idea may have
		a few problems: 1. it may not find a video with a script which is ok cause I can do a few tries and if I don't find it, i can
		go right to the chatGPT as I stated before.
		2. it may find a bullshit script - which maybe I can fix with the right prompt
		******************************************************************************************************************************
		*/
		for (let i = 0; i < videoIDs.length; i++) {
			transcriptResults = await transcriptYoutubeVideo(videoIDs[i]);
			if (!transcriptResults) {
				const chatCompletion = await chatGPTRewrite(prompt);
				if(!chatCompletion){
					return res.status(500).json({ error: "Cannot create ai guide" });
				}
				else{
					return res.status(200).json(chatCompletion.choices[0].message.content);
				}
			} else {
				if (transcriptResults.length > 0) {
					break;
				}
			}
		}

		let transcript: string = "";
		(transcriptResults as TranscriptResponse[]).map((result) => {
			transcript = transcript + "\n" + result.text;
		});
		const chatCompletion = await chatGPTRewrite(
			"Rewrite this text into a step by step guide, remove any unrelated content: " + transcript
		);
		!chatCompletion
			? res.status(500).json({ error: "Cannot transcript the video" })
			: res.status(200).json(chatCompletion.choices[0].message.content);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};
