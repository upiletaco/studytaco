// For Pages Router (pages/api/parse-pdf.ts)
import { NextApiRequest, NextApiResponse } from "next";
import pdfParse from 'pdf-parse';
import formidable from 'formidable';
import { createReadStream } from 'fs';

// Disable body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];
    console.log(fields)

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Read the file and parse PDF
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const readStream = createReadStream(file.filepath);
      
      readStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      readStream.on('error', (err) => reject(err));
      readStream.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // Parse PDF
    const data = await pdfParse(buffer);

    const cleanedText = data.text
    .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, ' ')       // Replace newlines with space
    .replace(/\t/g, ' ')            // Replace tabs with space
    .trim(); 

    return res.status(200).json({
      text: cleanedText,
      info: {
        pages: data.numpages,
        metadata: data.metadata,
      }
    });

  } catch (error) {
    console.error('PDF parsing error:', error);
    return res.status(500).json({ error: 'Failed to parse PDF, please pick smaller file' });
  }
}