import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

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

export default async function handleDeleteProductRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    try {
      const productId = req.query.id as string;
      console.log("Product ID to DELETE: ", productId);
      const db = await connectToDatabase();
      const result = await db.collection("products").deleteOne({ productId: productId});

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Product deleted successfully" });
        const productStoreDirectory = path.join(process.cwd(), "public/uploads", productId);
        fs.rm(productStoreDirectory, { recursive: true }, (err) => {
          if (err) {
            console.error(`Failed to remove directory: ${err.message}`);
          } else {
            console.log("Directory removed successfully");
          }
        });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the product" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
