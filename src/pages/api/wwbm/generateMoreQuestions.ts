// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";
import {
    getGameText,
    getWwbmQuestions,
    insertWwbmMc,
    insertWwbmQuestion,
} from "@/app/services/wwbmService";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Question {
    question: string;
    content: string[];
    correct: string;
}

interface QuizData {
    questions: Question[];
}


export const maxDuration = 180;
if (!groq) {
    throw new Error("Missing required environment variables");
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb", // Increase if needed
        },
        responseLimit: false,
        maxDuration: 180, // Set to 60 seconds
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { questions, game_id } = req.body;

        const text = await getGameText(game_id);

        const prompt = `
You are a quiz question generator. Using the provided text and questions, generate 10 unique multiple choice quiz questions that progressively get harder like the game Who wants to be a millionare. Questions have already been made previously.
Make sure to generate new questions which have not been used before. Format your response as a valid JSON array with the following structure. Do not include any additional text or explanations in your response:
[
  
    "questions": [
    {
        question: "QUIZ QUESTION",
        content: [
            "Option 1"
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correct: 'the correct answer '
    
    },
    {
        question: "QUIZ QUESTION",
        content: [
            "Option 1"
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correct: 'the correct answer '
    
    },
    {
        question: "QUIZ QUESTION",
        content: [
            "Option 1"
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correct: 'the correct answer '
    
    },
    .... till 15 questions

      
    ]
  
]

Requirements:
- Each of the 15 questions should be unique and based on the provided text
- Make sure the 15 questions are related to the text
- Difficulty should increase through each question
- Multiple choice options should be related to the text
- All questions must be factual and derived from the provided text
- Format response as valid JSON that can be parsed

Provided Text: ${text}

Provided Qestions: ${questions}

`;

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

            const parsedQuestions = JSON.parse(generatedQuestions) as QuizData;

            for (let i = 0; i < parsedQuestions.questions.length; i++) {
                const question: Question = parsedQuestions.questions[i];
                const question_id = await insertWwbmQuestion(
                    game_id,
                    question.question,
                );
                console.log(`Category saved at ${question_id}`);
                if (question_id == null) return null;
                for (let j = 0; j < question.content.length; j++) {
                    let correct = false;
                    if (question.content[j] == question.correct) {
                        correct = true;
                    }
                    await insertWwbmMc(
                        question_id,
                        question.content[j],
                        correct,
                    );
                }
            }

            const game = await getWwbmQuestions(game_id)

            console.log("New game: ")
            console.log(game)

          
            return res.status(200).json({
                questions: game,
            });
        } catch (error: unknown) {
            console.error("OpenAI API error:", error);

            // Handle other types of errors
            return res.status(500).json({
                error: "An unexpected error occurred",
                details: error instanceof Error ? error.message : String(error),
            });
        }
    } catch (error) {
        console.error("Groq API error:", error);
        return res.status(500).json({ error: "Failed to generate questions" });
    }
}
