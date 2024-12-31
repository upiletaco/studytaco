// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";





const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export const maxDuration = 180;
if (!groq) {
  throw new Error("Missing required environment variables");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase if needed
    },
    responseLimit: false,
    maxDuration: 180, // Set to 60 seconds

  },
};

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
You are a quiz question generator. Using the provided text, generate 3-5 unique categories of quiz questions. Each category should have 5 questions, with point values of 200, 400, 600, 800, and 1000.
Format your response as a valid JSON array with the following structure. Do not include any additional text or explanations in your response:
[
  {
    "category": "CATEGORY_NAME",
    "questions": [
      {
        "points": 200,
        "clue": "CLUE_TEXT",
        "answer": "ANSWER"
      },
      {
        "points": 400,
        "clue": "CLUE_TEXT",
        "answer": "ANSWER"
      },
      {
        "points": 600,
        "clue": "CLUE_TEXT",
        "answer": "ANSWER"
      },
      {
        "points": 800,
        "clue": "CLUE_TEXT",
        "answer": "ANSWER"
      },
      {
        "points": 1000,
        "clue": "CLUE_TEXT",
        "answer": "ANSWER"
      }
    ]
  }
]

Requirements:
- Each clue should be unique and based on the provided text
- Create no more than 5 categories
- Make sure the clue is a question related to the text
- Categories should be clever and thematic, relating to the content
- Difficulty should increase with point value
- All questions must be factual and derived from the provided text
- Format response as valid JSON that can be parsed

Provided Text: ${text}

`


    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant", // Your deployed model name
        temperature: 0.1,

        response_format: { type: "json_object" },
        
    });
    
    const generatedQuestions = completion.choices[0]?.message?.content;

    if (!generatedQuestions) {
        throw new Error("No questions generated");
    }

    const cleanedString = generatedQuestions
      .replace(/^"/, '') // Remove leading quote if it exists
      .replace(/"$/, '') // Remove trailing quote if it exists
      .replace(/\\n/g, '') // Remove \n characters
      .replace(/\\/g, ''); // Remove remaining backslashes
    


      const titlePrompt = `
You are a Title generator that makes 3 word summaries for any given text. I will provide a chunk of text that is used in a jeopardy game. Using the prodivded text, create a 1-3 word title for the content of the text.

Requirements:
- Return back only the title no other text
- Make sure the title is relevant to the topic discussed in the provided text
- Keep results at a maximum of 3 words


Provided Text: ${generatedQuestions.toString()}
`

const titleCompletion = await groq.chat.completions.create({
  messages: [{ role: "user", content: titlePrompt }],
  model: "llama-3.1-8b-instant", // Your deployed model name
  temperature: 0.7,

  response_format: {type: 'text'},
  
});

const generatedTitle = titleCompletion.choices[0]?.message?.content;
console.log(`Title: ${generatedTitle}`)
if (!generatedTitle) {
    throw new Error("No questions generated");
}

const title = firstThreeWords(generatedTitle)




    return res.status(200).json({ questions: cleanedString, title: title});
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