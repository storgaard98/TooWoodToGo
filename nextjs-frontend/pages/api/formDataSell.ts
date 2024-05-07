import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
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
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    if (files.images) {
      let uploadedImages = files as unknown as UploadedImage[];
      storeImagesInDirectory(uploadedImages);
    }
    console.log("Received fields:", fields.title);
    console.log("Received files:", files);

    // Process the fields and files here

    res.status(200).json({ message: "Data received successfully" });
  });
}

// Function to store images in public/uploads directory
async function storeImagesInDirectory(files: UploadedImage[]) {
  const uniqueId = generateUniqueId(); // Generate a unique id for the store
  const storeDirectory = `public/uploads/${uniqueId}`; // Create a directory path for the store

  // Create the directory if it doesn't exist
  if (!fs.existsSync(storeDirectory)) {
    fs.mkdirSync(storeDirectory, { recursive: true });
  }

  // Move the uploaded images to the store directory
  for (const file of files) {
    const filePath = `${storeDirectory}/${file.name}`;
    // Move the uploaded images to the store directory
    const index = files.indexOf(file); // Get the index of the file in files array
    fs.renameSync(filePath, `newFileName${index}`); // Rename the file with the index
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
