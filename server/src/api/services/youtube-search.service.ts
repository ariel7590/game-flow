import * as yt from 'youtube-search-without-api-key';

export default async function searchOnYoutube(query: string){
    try{
        return await yt.search(query);
    }catch(error){
        throw new Error("Video search has failed: " + error);
    }
}