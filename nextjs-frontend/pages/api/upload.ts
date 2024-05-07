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
      return res.status(500).json({ error: "Error parsing the file" });
    }

    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!file.path) {
      return res.status(400).json({ error: "File upload was interrupted" });
    }

    // Destination directory
    const uploadDir = join(process.cwd(), "public", "uploads");
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

    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  });
}
