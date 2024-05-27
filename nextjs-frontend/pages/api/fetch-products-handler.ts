// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let productsCache: Product[] | null = null;

type Product = {
  id: string;
  productName: string;
  price: string;
  pathToImage: string;
};

export default async function handleGetProductsRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      let fetchedProducts: Product[] = [];
      /*  if (productsCache) {
        fetchedProducts = productsCache;
      } else { */
      const productsResponse = await fetch(`${apiUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!productsResponse.ok) {
        throw new Error("Server response was not ok");
      }
      const data = await productsResponse.json(); // Convert the response body to a JavaScript object
      fetchedProducts = data.map((item: any) => ({
        productId: item.productId,
        productName: item.productName || "Intet produkt navn",
        price: item.price || "",
        pathToImage: getFirstImagePath(item.productId),
        description: item.description || "Ingen beskrivelse angivet",
        acceptedPrice: item.acceptedPrice,
      }));
      productsCache = fetchedProducts;
      //}
      res.status(200).json(fetchedProducts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while getting products" });
    }
  }
}

function getFirstImagePath(productId: string) {
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    productId,
  );
  let imagePath = "/no-image.jpg";

  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    const firstImage = files.find(
      (file) =>
        path.extname(file).toLowerCase() === ".jpg" ||
        path.extname(file).toLowerCase() === ".jpeg" ||
        path.extname(file).toLowerCase() === ".png",
    );

    if (firstImage) {
      imagePath = path.join("/uploads", productId, firstImage);
    }
  }
  return imagePath;
}
