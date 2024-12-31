// src/services/questionGenerator.ts
import OpenAI from "openai";
import { join } from "path";

export interface GenerateQuestionsRequest {
  text: string;
}

export interface GenerateQuestionsResponse {
  questions: string;
}

export default class QuestionGeneratorService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY,
      baseURL: join(process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT!, "openai/deployments", "gpt-4"),
      defaultQuery: { "api-version": "2023-12-01-preview" },
      defaultHeaders: { "api-key": process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY },
    });
  }

  public async generateQuestions(text: string): Promise<GenerateQuestionsResponse> {
    try {
      if (!text) {
        throw new Error("Text is required");
      }

      const completion = await this.openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: this.getPrompt(text) 
        }],
        model: "gpt-4",
        temperature: 0.4,
        response_format: { type: "json_object" },
      });

      const generatedQuestions = completion.choices[0]?.message?.content;

      if (!generatedQuestions) {
        throw new Error("No questions generated");
      }

      return { questions: generatedQuestions };
    } catch (error: unknown) {
      console.error("Question generation error:", error);
      throw new Error("Failed to generate questions");
    }
  }

  private getPrompt(text: string): string {
    return  `
You are a Jeopardy question generator. Using the provided text, generate 3-5 unique categories of Jeopardy questions. Each category should have 5 questions, with point values of 200, 400, 600, 800, and 1000.

Format your response as a valid JSON array with the following structure. Do not include any additional text or explanations in your response:

[
  {
    "category": "CATEGORY_NAME",
    "questions": [
      {
        "points": 200,
        "clue": "CLUE_TEXT",
        "question": "ANSWER_IN_QUESTION_FORMAT"
      },
      {
        "points": 400,
        "clue": "CLUE_TEXT",
        "question": "ANSWER_IN_QUESTION_FORMAT"
      },
      {
        "points": 600,
        "clue": "CLUE_TEXT",
        "question": "ANSWER_IN_QUESTION_FORMAT"
      },
      {
        "points": 800,
        "clue": "CLUE_TEXT",
        "question": "ANSWER_IN_QUESTION_FORMAT"
      },
      {
        "points": 1000,
        "clue": "CLUE_TEXT",
        "question": "ANSWER_IN_QUESTION_FORMAT"
      }
    ]
  }
]

Requirements:
- Each clue should be unique and based on the provided text
- Questions must be phrased in Jeopardy format (e.g., "Who is...", "What is...")
- Categories should be clever and thematic, relating to the content
- Difficulty should increase with point value
- All questions must be factual and derived from the provided text
- Format response as valid JSON that can be parsed

Provided Text: ${text}

`
  }
}