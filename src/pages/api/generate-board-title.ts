// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const maxDuration = 180;
if (!groq) {
  throw new Error("Missing required environment variables");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }



const prompt = `
You are a Title generator that makes 3 word summaries for any given text. I will provide a chunk of text that is used in a jeopardy game. Using the prodivded text, create a 1-3 word title for the content of the text.

Requirements:
- Return back only the title no other text
- Make sure the title is relevant to the topic discussed in the provided text
- Keep results at a maximum of 3 words

Provided Text: ${text}

`


    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant", // Your deployed model name
        temperature: 0.1,

        response_format: { type: "json_object" },
        
    });
    
    const generatedTitle = completion.choices[0]?.message?.content;

    if (!generatedTitle) {
        throw new Error("No questions generated");
    }

    
    const title = firstThreeWords(generatedTitle)

    


    return res.status(200).json({ title: title });
    } catch (error: unknown) {
      console.error("OpenAI API error:", error);
  
    

    // Handle other types of errors
    return res.status(500).json({ 
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error)
    });
    }
       
    } catch (error) {
        console.error("Groq API error:", error);
        return res.status(500).json({ error: "Failed to generate questions" });
    }
}


function firstThreeWords(str: string): string {
  const words = str.trim().split(/\s+/);
  if (words.length > 3) {
      return words.slice(0, 3).join(' ');
  }
  return str;
}