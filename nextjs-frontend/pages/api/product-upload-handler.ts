import { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handleProductUploadRequest(
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

        const productUniqueId = storeProductFilesInDirectory(files);
        await storeProductDataInDatabase(fields, await productUniqueId);
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
async function storeProductFilesInDirectory(productFiles: any) {
  const uniqueId = generateProductUniqueId(); // Generate a unique id for the store
  const productStoreDirectory = path.join(
    process.cwd(),
    "public/uploads",
    uniqueId
  ); // Create a directory path for the store

  // Check if destination directory exists, if not create it
  if (!fs.existsSync(productStoreDirectory)) {
    fs.mkdirSync(productStoreDirectory, { recursive: true });
  }

  for (const [filename, files] of Object.entries(productFiles)) {
    for (const file of files as Array<any>) {
      // Check if source file exists
      if (!fs.existsSync(file.filepath)) {
        console.error(`Source file does not exist: ${file.filepath}`);
        continue;
      }

      fs.renameSync(
        file.filepath,
        path.join(productStoreDirectory, file.newFilename)
      ); // Move and rename the file

      console.log("uniqueId: ", uniqueId);
    }
  }
  return uniqueId;
}
//TODO make sure that description is passed as a string
// Function to store received data in the database
async function storeProductDataInDatabase(
  fields: any,
  uniqueId: string | undefined
) {
  if (typeof uniqueId !== "string") {
    console.error("Invalid unique id");
    return;
  }
  // Store data in the database
  fetch(`${apiUrl}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: fields.productName,
      description: fields.description,
      price: fields.price,
      uniqueId,
    }),
  });
  console.log("Storing data in the database...");
}

function generateProductUniqueId() {
  // Generate a unique id using a combination of timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
