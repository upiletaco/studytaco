import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const {url, email} = req.body;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your TacoLearn Jeopardy Board is Ready!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #060CE9; padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #FFCC00; font-size: 36px; font-family: serif; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                Your Jeopardy Board is Ready!
                            </h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">
                                Thanks for creating your custom Jeopardy board with TacoLearn! Your board is now ready to play and share with others.
                            </p>

                            <!-- Board Link Section -->
                            <table role="presentation" style="width: 100%; background-color: #f8f8f8; border-radius: 8px; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 15px; color: #060CE9; font-size: 24px;">Access Your Board</h2>
                                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">
                                            Your custom Jeopardy board is just a click away. Share this link with anyone you'd like to play with!
                                        </p>
                                        <div style="text-align: center;">
                                            <a href="${url}" 
                                               style="display: inline-block; background-color: #FFCC00; color: #060CE9; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-top: 10px;">
                                                Play Your Board
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">
                                Have fun playing and learning! Don't forget that you can create as many custom boards as you like to make your learning journey more engaging.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #060CE9; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #FFCC00; font-size: 14px;">
                                © 2024 TacoLearn. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

    try {
        const { data, error } = await resend.emails.send({
            from: "TacoLearn <play@tacolearn.com>",
            to: email,
            subject: "Your Jeopardy Board is Ready!",
            html: emailHtml,
        });

        if (error) {
            console.error(error)
            return res.status(400).json(error);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}


