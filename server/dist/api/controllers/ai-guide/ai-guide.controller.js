"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGenerateGuide = void 0;
const youtube_transcript_service_1 = __importDefault(require("../../services/youtube-transcript.service"));
const youtube_search_service_1 = __importDefault(require("../../services/youtube-search.service"));
const httpGenerateGuide = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(prompt);
        const videoIDs = [];
        const searchResults = await (0, youtube_search_service_1.default)(prompt);
        searchResults.data.items?.map((item) => videoIDs.push(item.id?.videoId));
        let transcriptResults = [];
        for (let i = 0; i < videoIDs.length; i++) {
            transcriptResults = await (0, youtube_transcript_service_1.default)(videoIDs[i]);
            if (transcriptResults.length > 0) {
                break;
            }
        }
        let transcript = "";
        transcriptResults.map((result) => {
            transcript = transcript + "\n" + result.text;
        });
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
