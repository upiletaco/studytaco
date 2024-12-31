import { shareBoard } from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { categories, title, score} = await req.body;

        console.log(`Categories: ${categories}`)
        console.log(`Title: ${title}`)

        // const game_id = 1;
        const game_id = await shareBoard({ categories: categories, }, title, score);
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
