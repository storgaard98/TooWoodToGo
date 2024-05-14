import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new IncomingForm({
      keepExtensions: true, // keep file extension
      multiples: true,
      allowEmptyFiles: true,
    }); // allow multiple files});

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form: ", err);
          // Check if the error code is 1008 (minFileSize error)
          if (err.code === 1008) {
            // Return a response and do not throw an error
            return res.status(200).json({ message: "File size is too small" });
          }
          return res.status(500).json({ error: "Something went wrong" });
        }
        // Rest of your code...
        const uniqueId = storeFilesInDirectory(files, fields.productName);
        //await storeDataInDatabase(fields, await uniqueId);
      });
    } catch (error) {
      console.error("Error in POST handler: ", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// Function to store images in public/uploads directory
async function storeFilesInDirectory(files123: any, productName: string) {
  const uniqueId = generateUniqueId(productName); // Generate a unique id for the store
  const storeDirectory = path.join(process.cwd(), "public/uploads", uniqueId); // Create a directory path for the store

  // Check if destination directory exists, if not create it
  if (!fs.existsSync(storeDirectory)) {
    fs.mkdirSync(storeDirectory, { recursive: true });
  }

  for (const [filename, files] of Object.entries(files123)) {
    for (const file of files) {
      // Check if source file exists
      if (!fs.existsSync(file.filepath)) {
        console.error(`Source file does not exist: ${file.filepath}`);
        continue;
      }

      if (file.mimetype !== "audio/mp4") {
        fs.renameSync(
          file.filepath,
          path.join(storeDirectory, file.newFilename)
        ); // Move and rename the file
      } else {
        //Just move the file and not rename it
        console.log("blob");
        fs.renameSync(
          file.filepath,
          path.join(storeDirectory, file.newFilename)
        ); // Move and rename the file
      }
      console.log("uniqueId: ", uniqueId);
    }
  }
  return uniqueId;
}

// Function to store received data in the database
async function storeDataInDatabase(fields: any, uniqueId: string) {
  // Store data in the database
  console.log("Storing data in the database...");
}

function generateUniqueId(productName: string) {
  // Generate a unique id using a combination of timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}