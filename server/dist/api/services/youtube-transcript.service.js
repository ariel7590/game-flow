"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_transcript_1 = require("youtube-transcript");
async function transcriptYoutubeVideo(videoLink) {
    try {
        return await youtube_transcript_1.YoutubeTranscript.fetchTranscript(videoLink);
    }
    catch (error) {
        throw new Error("Transcript has failed: " + error);
    }
}
exports.default = transcriptYoutubeVideo;
