import { getWwbmGames, getWwbmQuestions } from "@/app/services/wwbmService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { game_id } = await req.body;

        console.log(`Game id in retrieve game: ${game_id}`);

        const data = await getWwbmGames(game_id);



        const game = await getWwbmQuestions(game_id)
        if(data== null) return null
        if (game == null) return null
        console.log(data)
        console.log(game)



        return res.status(200).json({ data: data, questions: game });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}
