import { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import sanitize from "sanitize-filename";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false,
  },
};

let client: MongoClient;

async function connectToDatabase() {
  const mongoUrl = process.env.ME_CONFIG_MONGODB_URL;
  const dbName = process.env.ME_CONFIG_MONGODB_AUTH_DATABASE;

  if (!mongoUrl) {
    throw new Error("Missing MongoDB connection URL");
  }
  if (!dbName) {
    throw new Error("Missing MongoDB database name");
  }

  if (!client) {
    client = new MongoClient(mongoUrl);
    await client.connect();
  }
  return client.db(dbName);
}

export default async function handleProductUploadRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new IncomingForm({
      keepExtensions: true,
      multiples: true,
      allowEmptyFiles: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form: ", err);
          if (err.code === 1008) {
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
          return res.status(400).json({ error: "Missing required fields" });
        }

        const description =
          fields.description && fields.description[0]
            ? fields.description[0]
            : "Ingen beskrivelse angivet";
        const productId = await storeProductFilesInDirectory(files);
        await storeProductDataInDatabase(fields, productId);
        await sendEmailToStarkStore(
          productId,
          fields.productName[0],
          fields.quantity[0],
          description
        );

        return res
          .status(200)
          .json({
            message: "Product uploaded successfully and email is sent to Stark",
          });
      });
    } catch (error) {
      console.error("Error in POST handler: ", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

async function storeProductFilesInDirectory(productFiles: any) {
  const productId = generateProductId();
  const productStoreDirectory = path.join(
    process.cwd(),
    "public/uploads",
    productId
  );

  try {
    if (!fs.existsSync(productStoreDirectory)) {
      fs.mkdirSync(productStoreDirectory, { recursive: true });
    }
  } catch (err) {
    console.error(`Error creating directory: ${productStoreDirectory}`, err);
  }

  for (const [filename, files] of Object.entries(productFiles)) {
    for (const file of files as Array<any>) {
      if (typeof file.filepath === "string") {
        const normalizedPath = path.normalize(file.filepath);
        if (path.isAbsolute(normalizedPath)) {
          try {
            fs.accessSync(normalizedPath, fs.constants.F_OK);
          } catch (err) {
            console.error(`Source file does not exist: ${normalizedPath}`, err);
          }
        }

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
          fs.renameSync(file.filepath, newFilePath);
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

async function storeProductDataInDatabase(fields: any, productId: string) {
  if (typeof productId !== "string") {
    console.error("Invalid unique id");
    return;
  }
  const db = await connectToDatabase();
  await db.collection("products").insertOne({
    productId,
    productName: fields.productName[0],
    description: fields.description[0],
    quantity: fields.quantity[0],
    acceptedPrice: false,
    date: new Date().toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  });
  console.log("Storing data for ", productId, "in the database...");
}

function generateProductId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

let url = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? (process.env.NEXT_PUBLIC_VERCEL_URL as string)
  : (process.env.NEXT_PUBLIC_SITE_URL as string);

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER_EMAIL as string;
const receiver = process.env.RESEND_RECEIVER_EMAIL as string;

async function sendEmailToStarkStore(
  productId: string,
  productName: string,
  quantity: string,
  description: string
) {
  await resend.emails.send({
    from: sender,
    to: receiver,
    subject: `Nyt produkt tilbud:  ${productName} fra TKP BYG A/S`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #01346B;">
      <h1 style="color: #F5821E;">Tilbud modtaget fra TKP BYG A/S</h1>
      <h1 style="color: #001E3E;">${productName}</h1>
      <p style="margin-bottom: 10px; color: #657383;">${description}</p>
      <p style="margin-bottom: 10px; color: #657383;">Antal: ${quantity}</p>
      <p style="margin-bottom: 10px; color: #657383;">Telefonnummer: 12345678</p>
      <p style="margin-bottom: 20px; color: #657383;">Email: ByggeMandBob@tkpbyg.dk</p>
      <a href="${url}/${productId}" style="background-color: #0CD1FD; color: white; text-decoration: none; padding: 10px 20px; margin-bottom: 20px; display: inline-block;">Vis tilbud</a>
      <p style="margin-bottom: 10px; color: #657383;">Med venlig hilsen,</p>
      <p style="margin-bottom: 0; color: #657383;">TooWoodToGo</p>
    </div>
    `,
  });
}
