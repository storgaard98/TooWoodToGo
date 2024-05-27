import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import path from "path";
import fs from "fs";

type Product = {
  id: string;
  productName: string;
  price: string;
  pathToImage: string;
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

export default async function handleGetProductsRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const products = await db.collection("products").find({}).toArray();
      const fetchedProducts = products.map((product) => ({
        productId: product.productId,
        productName: product.productName || "Intet produkt navn",
        price: product.price || "",
        pathToImage: getFirstImagePath(product.productId),
        description: product.description || "Ingen beskrivelse angivet",
        acceptedPrice: product.acceptedPrice,
      }));

      res.status(200).json(fetchedProducts);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while getting products" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getFirstImagePath(productId: string) {
  const directoryPath = path.join(process.cwd(), "public", "uploads", productId);
  let imagePath = "/no-image.jpg";

  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    const firstImage = files.find((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase()),
    );

    if (firstImage) {
      imagePath = path.join("/uploads", productId, firstImage);
    }
  }
  return imagePath;
}
