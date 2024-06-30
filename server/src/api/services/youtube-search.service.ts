import { google } from 'googleapis';
import { youtube } from '../../config/youtube-search.config';

export default async function searchOnYoutube(query: string){
    try{
        return await youtube.search.list({
            part: ["snippet"],
            q: query
        })
    }catch(error){
        throw new Error("Video search has failed: " + error);
    }
}