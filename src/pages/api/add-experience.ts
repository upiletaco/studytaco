import { addExperience } from "@/app/services/wwbmService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const {score, user_id} = await req.body;
        console.log(`In update xp, of ${score} for user_id of ${user_id}`)
        const validUpdate = await addExperience(score, user_id);
        if(validUpdate == null){
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
