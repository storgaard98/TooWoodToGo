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
  res: NextApiResponse,
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

        if (
          !fields.productName ||
          !fields.productName[0] ||
          !fields.quantity ||
          !fields.quantity[0]
        ) {
          res.status(400).json({ error: "Missing required fields" });
          return;
        }
        let description = "";
        if (fields.description && fields.description[0]) {
          description = "No description provided";
        }

        const productId = storeProductFilesInDirectory(files);
        await storeProductDataInDatabase(fields, await productId);
        res.status(200).json({ productId: await productId });
        sendEmailToStarkStore(
          productId,
          fields.productName[0],
          fields.quantity[0],
          fields.description?.[0] || description,
        );
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
  const productId = generateProductId(); // Generate a unique id for the store
  const productStoreDirectory = path.join(
    process.cwd(),
    "public/uploads",
    productId,
  ); // Create a directory path for the store

  // Check if destination directory exists, if not create it
  if (!fs.existsSync(productStoreDirectory)) {
    fs.mkdirSync(productStoreDirectory, { recursive: true });
  }

  for (const [filename, files] of Object.entries(productFiles)) {
    for (const file of files as Array<any>) {
      // Check if source file exists
      if (typeof file.filepath === "string") {
        const normalizedPath = path.normalize(file.filepath);
        if (path.isAbsolute(normalizedPath)) {
          try {
            fs.accessSync(normalizedPath, fs.constants.F_OK);
          } catch (err) {
            console.error(`Source file does not exist: ${normalizedPath}`);
            continue;
          }
        }
      }

      fs.renameSync(
        file.filepath,
        path.join(productStoreDirectory, file.newFilename),
      ); // Move and rename the file
    }
  }
  return productId;
}
// Function to store received data in the database
async function storeProductDataInDatabase(
  fields: any,
  productId: string | undefined,
) {
  if (typeof productId !== "string") {
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
      productName: fields.productName[0] as string,
      description: fields.description[0] as string,
      quantity: fields.quantity[0] as string,
      productId,
    }),
  });
  console.log("Storing data for ", productId, "in the database...");
}

function generateProductId() {
  // Generate a unique id using a combination of timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
async function sendEmailToStarkStore(
  productId: Promise<string>,
  productName: string,
  quantity: string,
  description: string,
) {
  const domain = "http://localhost:3000"; // replace with your actual domain
  try {
    const response = await fetch(`${domain}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: await productId,
        productName: productName,
        quantity: quantity,
        description: description,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
