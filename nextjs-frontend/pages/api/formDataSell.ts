import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

interface UploadedImage {
  file: File;
  name: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const form = new IncomingForm({
      uploadDir: "./public/uploads", // folder path to save your files
      keepExtensions: true, // keep file extension
      multiples: true,
    }); // allow multiple files});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong" });
      }

      // Prepare the files for the storeImagesInDirectory function
      let images: UploadedImage[] = [];
      for (let key in files) {
        console.log(files);
        images.push({
          file: files[key][0],
          name: files[key][0],
        });
      }
      // Call the storeImagesInDirectory function
      const uniqueId = await storeImagesInDirectory(images);

      // Now you can use the uniqueId to reference the images in your database
      // ...

      res
        .status(200)
        .json({ message: "Upload successful", uniqueId: uniqueId });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// Function to store images in public/uploads directory
async function storeImagesInDirectory(files: UploadedImage[]) {
  const uniqueId = generateUniqueId(); // Generate a unique id for the store
  const storeDirectory = path.join(process.cwd(), "public/uploads", uniqueId); // Create a directory path for the store

  // Create the directory if it doesn't exist
  if (!fs.existsSync(storeDirectory)) {
    fs.mkdirSync(storeDirectory, { recursive: true });
  }

  // Move the uploaded images to the store directory
  for (const uploadedImage of files) {
    const oldPath = uploadedImage.file.filepath; // Get the old file path
    const newFileName = `${uniqueId}-${uploadedImage.file.newFilename}`; // Create a new file name
    const newPath = path.join(storeDirectory, newFileName); // Create the new file path

    // Rename (move) the file
    fs.renameSync(oldPath, newPath);
  }

  return uniqueId; // Return the unique id of the store
}

// Function to store received data in the database
async function storeDataInDatabase(fields: any, files: any) {
  // Store data in the database
}

function generateUniqueId() {
  // Generate a unique id using a combination of timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
