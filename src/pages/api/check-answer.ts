// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { join } from "path";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2023-12-01-preview";
const model = "gpt-4o";

const openai = new OpenAI({
    apiKey,
    baseURL: join(endpoint!, "openai/deployments", model),
    defaultQuery: { "api-version": apiVersion },
    defaultHeaders: { "api-key": apiKey },
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { clue, expected_answer, user_answer } = req.body;

        if (!clue || !expected_answer || !user_answer) {
            return res.status(400).json({
                error: "Clue, expected answer, and user answer are required",
            });
        }

        const prompt = `
        You are a jeopardy host that will be evaluating answers to jeopardy style questions. You will be provided the jeopardy style clue, the expected output and user output. 
        Your job is to determine if the user's answer matches the correct answer. SOmetime there might be a typo or the user's answer may not be perfectly identical to the expected answer.
        It is up to you to determine if the user's answer is True or False.

        Instructions: 
        1. Return back "True" if the answer is correct or "False" if the answer is incorrect. 
        2. Do not return back any other text besides "True" or "False"
        3. Return back a json object in the format : {"answer": "True"} or {"answer": "False"}

        Clue: ${clue}
        Expected_answer: ${expected_answer}
        User answer: What is ${user_answer}?

        `
    ;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: process.env.AZURE_OPENAI_MODEL_NAME || "gpt-4", // Your deployed model name
            temperature: 0.4,
            response_format: { type: "json_object" },
            // max_tokens: 1000,
        });

        const answer = completion.choices[0]?.message?.content;
        console.log(answer);
        if (!answer) {
            throw new Error("No answer generated");
        }

        const jsonAnswer = JSON.parse(answer)

        const finalAnswer = Boolean(jsonAnswer.answer);


        return res.status(200).json(finalAnswer);
    } catch (error) {
        console.error("OpenAI API error:", error);
        return res.status(500).json({ error: "Failed to generate questions" });
    }
}
