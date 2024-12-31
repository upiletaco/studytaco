import { BoardPreview } from "@/app/data/sampleBoardData";
import { getAllPublicGames } from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const data: BoardPreview[]= await getAllPublicGames();

        if (data == null) return res.status(404).json({ error: "No data found" });

        return res.status(200).json({ data: data});
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}