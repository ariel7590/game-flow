"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGenerateGuide = void 0;
const youtube_transcript_1 = require("youtube-transcript");
const httpGenerateGuide = async (req, res) => {
    try {
        const prompt = req.body;
        const transcript = await youtube_transcript_1.YoutubeTranscript.fetchTranscript("https://www.youtube.com/watch?v=AtgAzhxY4Cw");
        !transcript
            ? res.status(500).json({ error: "Cannot transcript the video" })
            : res.status(200).json(transcript);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGenerateGuide = httpGenerateGuide;
