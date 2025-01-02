import { getUserWwbmGames } from "@/app/services/wwbmService";
import { WwbmGame } from "@/app/util/wwbm.types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

        const { user_id } = await req.body;


        const data: WwbmGame[] | undefined = await getUserWwbmGames(user_id);

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