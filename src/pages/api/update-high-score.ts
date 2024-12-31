import {updateHighScore } from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const {score, id} = await req.body;
        console.log(`In update-high-score, score of ${score} for id of ${id}`)
        // const game_id = 1;
        const validUpdate = await updateHighScore(score, id);
        if(!validUpdate){
            return res.status(500).json({error: "Score not updated properly"});

        }
        return res.status(200).json({status: "Success"});
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}
