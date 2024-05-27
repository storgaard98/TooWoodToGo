import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

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

export default async function handlePriceSetRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const { price } = req.body;
    const productId = req.query.id as string;
    try {
      const db = await connectToDatabase();
      const result = await db.collection("products").updateOne(
        { productId: productId },
        { $set: { price } },
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Price set successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error setting price" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
