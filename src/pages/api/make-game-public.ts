import { makeBoardPublic } from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const {id} = await req.body;
        const validUpdate = await makeBoardPublic(id);
        if(!validUpdate){
            return res.status(500).json({error: "Game not updated properly"});
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
