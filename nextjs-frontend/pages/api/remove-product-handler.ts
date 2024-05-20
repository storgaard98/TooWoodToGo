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
};

export default async function handleDeleteProductRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    try {
      console.log("req.body: ", req.body);
      const { productId: productId } = req.body;
      console.log("productId to DELETE: ", productId);
      const productResponse = await fetch(
        `${apiUrl}/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!productResponse.ok) {
        throw new Error("Server response was not ok");
      }

      const response = await productResponse.json();

      if (response.message === "Product deleted successfully") {
        res.status(200).json(response);
        //Delete the folder containing the images and audio
        const productStoreDirectory = path.join(
          process.cwd(),
          "public/uploads",
          productId,
        );
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
      res
        .status(500)
        .json({ error: "An error occurred while deleting the product" });
    }
  }
}
