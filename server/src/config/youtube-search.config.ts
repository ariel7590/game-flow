import { google } from 'googleapis';
import config from "config";

export const youtube = google.youtube({
    version: "v3",
    auth: config.get("youtubeAPI") as string
})