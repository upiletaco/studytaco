import { saveUserEmail} from "@/app/services/supabaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { email} = await req.body;

        console.log(`Categories: ${email}`)
        console.log(`Title: ${email}`)

        // const game_id = 1;
        const email_id = await saveUserEmail(email);
        return res.status(200).json({ "id": email_id });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}
