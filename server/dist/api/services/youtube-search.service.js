"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_search_config_1 = require("../../config/youtube-search.config");
async function searchOnYoutube(query) {
    try {
        return await youtube_search_config_1.youtube.search.list({
            part: ["snippet"],
            q: query
        });
    }
    catch (error) {
        throw new Error("Video search has failed: " + error);
    }
}
exports.default = searchOnYoutube;
