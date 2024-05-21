import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export default async function handleGetProductRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const productId = req.query.productId as string;
      console.log("fetching a product with productId: ", productId);
      const product = await fetchProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while getting the product" });
    }
  }
}

async function fetchProductById(productId: string): Promise<Product | null> {
  // Fetch the product from the database using the productId
  // Replace this with your actual database query or API call
  const productResponse = await fetch(`${apiUrl}/api/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!productResponse.ok) {
    throw new Error("Server response was not ok");
  }
  const productData = await productResponse.json(); // Convert the response body to a JavaScript object

  if (productData) {
    return {
      id: productData._id,
      productName: productData.productName || "Intet produkt navn",
      price: productData.price || "No price",
      pathToImages: getAllImagePaths(productData._id),
      pathToAudio: getProductAudio(productData._id) || "",
      date: productData.date || "Ingen dato angivet",
      description: productData.description || "Ingen beskrivelse",
      acceptedPrice: productData.acceptedPrice || false,
      quantity: productData.quantity || "Antal ikke angivet",
    };
  } else {
    return null;
  }
}

function getAllImagePaths(productId: string): string[] {
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    productId,
  );
  let imagePaths: string[] = [];

  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    imagePaths = files
      .filter(
        (file) =>
          path.extname(file).toLowerCase() === ".jpg" ||
          path.extname(file).toLowerCase() === ".png" ||
          path.extname(file).toLowerCase() === ".jpeg",
      )
      .map((file) => path.join("/uploads", productId, file));
  }
  return imagePaths;
}
function getProductAudio(productId: string): string {
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    productId,
  );
  let audioPath = "";
  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    audioPath = path.join("/uploads", productId, (files[0] || "").toString());
  }
  return audioPath;
}
