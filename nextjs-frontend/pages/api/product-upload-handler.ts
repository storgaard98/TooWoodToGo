import { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import sanitize from "sanitize-filename";
import { Resend } from "resend";

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
          description = "Ingen beskrivelse angivet";
        }
        const productId = await storeProductFilesInDirectory(files);
        await storeProductDataInDatabase(fields, productId);
        await sendEmailToStarkStore(
          productId,
          fields.productName[0],
          fields.quantity[0],
          fields.description?.[0] || description
        );
        res.status(200).json({ message: "Product uploaded successfully and email is send to Stark" });
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
  ); // Create a directory path for the store// Create a directory path for the store

  // Check if destination directory exists, if not create it
  try {
    if (!fs.existsSync(productStoreDirectory)) {
      fs.mkdirSync(productStoreDirectory, { recursive: true });
    }
  } catch (err) {
    console.error(`Error creating directory: ${productStoreDirectory}`, err);
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
            console.error(`Source file does not exist: ${normalizedPath}`, err);
          }
        }

        // Create a directory for the new file if it doesn't exist
        const sanitizedFilename = sanitize(file.newFilename);

        if (sanitizedFilename !== file.newFilename) {
          console.error("Invalid filename");
        }

        const newFilePath = path.join(productStoreDirectory, sanitizedFilename);
        const newFileDirectory = path.dirname(newFilePath);
        try {
          if (!fs.existsSync(newFileDirectory)) {
            fs.mkdirSync(newFileDirectory, { recursive: true });
          }
        } catch (err) {
          console.error(`Error creating directory: ${newFileDirectory}`, err);
        }

        try {
          fs.renameSync(file.filepath, newFilePath); // Move and rename the file
        } catch (err) {
          console.error(
            `Error moving file: ${file.filepath} to ${newFilePath}`,
            err
          );
        }
      }
    }
  }
  return productId;
}
// Function to store received data in the database
async function storeProductDataInDatabase(fields: any, productId: string) {
  if (typeof productId !== "string") {
    console.error("Invalid unique id");
    return;
  }
  // Store data in the database
  await fetch(`${apiUrl}/api/products`, {
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
let url = "";
if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
  url = process.env.NEXT_PUBLIC_VERCEL_URL as string;
} else {
  url = process.env.NEXT_PUBLIC_SITE_URL as string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER_EMAIL as string;
const receiver = process.env.RESEND_RECEIVER_EMAIL as string;

async function sendEmailToStarkStore(
  productId: string,
  productName: string,
  quantity: string,
  description: string
) {
  resend.emails.send({
    from: sender,
    to: receiver,
    subject: `Nyt produkt tilbud:  ${productName} fra TKP BYG A/S`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #01346B;">
    <h1 style="color: #F5821E;">Tilbud modtaget fra TKP BYG A/S</h1>
    <h1 style="color: #001E3E;">${productName}</h1>
    <p style="margin-bottom: 10px; color: #657383;">${description}</p>
    <p style="margin-bottom: 10px; color: #657383;">Antal: ${quantity}</p>
    <p style="margin-bottom: 10px; color: #657383;">Telefonnummer: 12345678 </p>
    <p style="margin-bottom: 20px; color: #657383;">Email: ByggeMandBob@tkpbyg.dk </p>
    <a href="${url}/${productId}" style="background-color: #0CD1FD; color: white; text-decoration: none; padding: 10px 20px; margin-bottom: 20px; display: inline-block;">Vis tilbud</a>
    <p style="margin-bottom: 10px; color: #657383;">Med venlig hilsen,</p>
    <p style="margin-bottom: 0; color: #657383;">TooWoodToGo</p>
</div>
`,
  });
}
