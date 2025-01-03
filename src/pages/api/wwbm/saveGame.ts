import { insertWwbmMatch } from "@/app/services/wwbmService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { questions, title, user_id, text } = await req.body;

        console.log(`Questions: ${questions}`);
        console.log(`Title: ${title}`);
        console.log(`User_id: ${user_id}`)

        // const game_id = 1;
        const game_id = await insertWwbmMatch(questions, title, user_id, text);
        return res.status(200).json({ "id": game_id });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}
