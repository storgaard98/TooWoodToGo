import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

type Product = {
  id: string;
  productName: string;
  price: string;
  pathToImages: string[];
  pathToAudio: string;
  date: string;
  description: string;
  acceptedPrice: boolean;
  quantity: string;
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

export default async function handleGetProductRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const productId = req.query.id as string;
      console.log("Fetching a product with productId: ", productId);
      const db = await connectToDatabase();
      const product = await db
        .collection("products")
        .findOne({ productId: productId });

      if (product) {
        res.status(200).json({
          id: product.productId,
          productName: product.productName || "Intet produkt navn",
          price: product.price || "No price",
          pathToImages: getAllImagePaths(product.productId),
          pathToAudio: getProductAudio(product.productId) || "",
          date: product.date || "Ingen dato angivet",
          description: product.description || "Ingen beskrivelse",
          acceptedPrice: product.acceptedPrice || false,
          quantity: product.quantity || "Antal ikke angivet",
        });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while getting the product" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getAllImagePaths(productId: string): string[] {
  const directoryPath = path.join(process.cwd(), "public", "uploads", productId);
  let imagePaths: string[] = [];

  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    imagePaths = files
      .filter((file) => [".jpg", ".png", ".jpeg"].includes(path.extname(file).toLowerCase()))
      .map((file) => path.join("/uploads", productId, file));
  }
  return imagePaths;
}

function getProductAudio(productId: string): string {
  const directoryPath = path.join(process.cwd(), "public", "uploads", productId);
  let audioPath = "";
  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    audioPath = path.join("/uploads", productId, (files[0] || "").toString());
  }
  return audioPath;
}
