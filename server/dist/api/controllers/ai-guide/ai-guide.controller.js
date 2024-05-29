"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGenerateGuide = void 0;
const youtube_search_service_1 = __importDefault(require("../../services/youtube-search.service"));
const httpGenerateGuide = async (req, res) => {
    try {
        const prompt = req.body;
        // const transcript = await transcriptYoutubeVideo("https://www.youtube.com/watch?v=AtgAzhxY4Cw");
        // !transcript
        // 	? res.status(500).json({ error: "Cannot transcript the video" })
        // 	: res.status(200).json(transcript);
        const searchResults = await (0, youtube_search_service_1.default)("devil may cry");
        !searchResults
            ? res.status(500).json({ error: "Cannot transcript the video" })
            : res.status(200).json(searchResults);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGenerateGuide = httpGenerateGuide;
