import { YoutubeTranscript } from "youtube-transcript";

export default async function transcriptYoutubeVideo(videoLink: string){
    try{
        return await YoutubeTranscript.fetchTranscript(videoLink);
    }catch(error){
        // throw new Error("Transcript has failed: " + error);
        console.log("Transcript has failed: " + error);
    }
}