"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGenerateGuide = void 0;
const chatGPT_service_1 = require("../../services/chatGPT.service");
const httpGenerateGuide = async (req, res) => {
    try {
        // const prompt = req.body.prompt as string;
        // console.log(prompt);
        // const videoIDs: string[] = [];
        // const searchResults = await searchOnYoutube(prompt);
        // searchResults.data.items?.map((item) =>
        // 	videoIDs.push(item.id?.videoId as string)
        // );
        // let transcriptResults: TranscriptResponse[] = [];
        // for (let i = 0; i < videoIDs.length; i++) {
        // 	transcriptResults = await transcriptYoutubeVideo(videoIDs[i]);
        // 	if (transcriptResults.length > 0) {
        // 		break;
        // 	}
        // }
        // let transcript: string = "";
        // transcriptResults.map((result) => {
        // 	transcript = transcript + "\n" + result.text;
        // });
        // !transcript
        // 	? res.status(500).json({ error: "Cannot transcript the video" })
        // 	: res.status(200).json(transcript);
        const chatCompletion = (0, chatGPT_service_1.chatGPTRewrite)();
        !chatCompletion
            ? res.status(500).json({ error: "Cannot transcript the video" })
            : res.status(200).json(chatCompletion);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGenerateGuide = httpGenerateGuide;
