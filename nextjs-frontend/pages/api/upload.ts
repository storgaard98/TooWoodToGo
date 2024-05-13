import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { join } from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = new IncomingForm({
    uploadDir: "./public/uploads", // folder path to save your files
    keepExtensions: true, // keep file extension
    multiples: true, // allow multiple files
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing the files" });
    }

    if (!files || !files.image) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedFiles = Object.values(files.image);

    //const uploadedFiles = files.image ? Object.values(files.image) :[];

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Destination directory
    const uploadDir = join(process.cwd(), "public", "uploads");

    await Promise.all(
      uploadedFiles.map(async (file: any) => {
        const fileName = file.name;
        const filePath = join(uploadDir, fileName);

        // Create uploads directory if it doesn't exist
        await fs.mkdir(uploadDir, { recursive: true });

        // Read the file from the temporary directory and write it to the destination directory
        const buffer = await fs.readFile(file.path);
        await fs.writeFile(filePath, buffer);

        // Construct the file URL
        const fileUrl = `/uploads/${fileName}`;

        // Example: Save file URL to database or do any other processing
      }),
    );

    res.status(200).json({ message: "Files uploaded successfully" });
  });
}
