import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.YT_RAPID_API_KEY;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    const {videoUrl} = req.body;

    try {
        if (!videoUrl) {
          throw new Error("Missing videoUrl in request body");
        }
    
        const url = new URL('https://youtube-transcripts.p.rapidapi.com/youtube/transcript');
        url.searchParams.append('url', videoUrl);
        url.searchParams.append('chunkSize', '500');
        url.searchParams.append('lang', 'en')
    
        console.log(apiKey)
        console.log(url.toString())
        const response = await axios.get(url.toString(), {headers: { 'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'youtube-transcripts.p.rapidapi.com'}})
    
    
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.data;
        console.log(data);
    
        const combinedText = data.content.reduce((accumulator: string, currentItem: { text: string; }) => {
          return accumulator + " " + currentItem.text.trim();
        }, "").trim(); //
    
        return res.status(200).json({"transcript": combinedText});
    
      } catch (error){
        console.log(error)
        return res.status(500).json({"error": error})
      }
}