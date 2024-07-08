"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGenerateGuide = void 0;
const youtube_transcript_service_1 = __importDefault(require("../../services/youtube-transcript.service"));
const youtube_search_service_1 = __importDefault(require("../../services/youtube-search.service"));
const chatGPT_service_1 = require("../../services/chatGPT.service");
const httpGenerateGuide = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const videoIDs = [];
        const searchResults = await (0, youtube_search_service_1.default)(prompt);
        if (!searchResults)
            res
                .status(500)
                .json({ error: "Something is wrong with the video searching!" });
        searchResults.data.items?.map((item) => videoIDs.push(item.id?.videoId));
        let transcriptResults;
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
            transcriptResults = await (0, youtube_transcript_service_1.default)(videoIDs[i]);
            if (!transcriptResults) {
                const chatCompletion = await (0, chatGPT_service_1.chatGPTRewrite)(prompt);
                if (!chatCompletion) {
                    return res.status(500).json({ error: "Cannot create ai guide" });
                }
                else {
                    return res.status(200).json(chatCompletion.choices[0].message.content);
                }
            }
            else {
                if (transcriptResults.length > 0) {
                    break;
                }
            }
        }
        let transcript = "";
        transcriptResults.map((result) => {
            transcript = transcript + "\n" + result.text;
        });
        const chatCompletion = await (0, chatGPT_service_1.chatGPTRewrite)("Rewrite this text into a step by step guide, remove any unrelated content: " + transcript);
        !chatCompletion
            ? res.status(500).json({ error: "Cannot transcript the video" })
            : res.status(200).json(chatCompletion.choices[0].message.content);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGenerateGuide = httpGenerateGuide;
