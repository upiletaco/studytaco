import { Category } from "@/app/data/sampleBoardData";
import { getBoard, getGameRow } from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { game_id } = await req.body;

        console.log(`Game id in retrieve game: ${game_id}`);

        const data: Category[] | null = await getBoard(game_id);

        const game = await getGameRow(game_id)
        if(data== null) return null
        if (game == null) return null
        const title = game.alias
        const score = game.high_score
        const isPublic = game.is_public


        console.log(`Length of return object: ${data?.length}`)


        return res.status(200).json({ data: data, title: title, high_score: score, is_public: isPublic });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}
