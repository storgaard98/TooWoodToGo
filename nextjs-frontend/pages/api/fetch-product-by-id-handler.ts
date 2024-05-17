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

export default async function handleGetProductRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const uniqueId = req.query.uniqueId as string;
            const product = await fetchProductById(uniqueId);
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

async function fetchProductById(uniqueId: string): Promise<Product | null> {
    // Fetch the product from the database using the uniqueId
    // Replace this with your actual database query or API call
    const productResponse = await fetch(`${apiUrl}/api/products/${uniqueId}`, {
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
            productName: productData.title || "No title",
            price: productData.price || "No price",
            pathToImages: getAllImagePaths(productData._id),
            pathToAudio: getProductAudio(productData._id) || "",
        };
    } else {
        return null;
    }
}

function getAllImagePaths(uniqueId: string): string[] {
    const directoryPath = path.join(process.cwd(), "public", "uploads", uniqueId);
    let imagePaths: string[] = [];

    if (fs.existsSync(directoryPath)) {
        const files = fs.readdirSync(directoryPath);
        imagePaths = files
            .filter(
                (file) =>
                    path.extname(file).toLowerCase() === ".jpg" ||
                    path.extname(file).toLowerCase() === ".png"
            )
            .map((file) => path.join("/uploads", uniqueId, file));
    }

    return imagePaths;
}
function getProductAudio(uniqueId: string): string {
    const directoryPath = path.join(process.cwd(), "public", "uploads", uniqueId);
    let audioPath = "";
    if (fs.existsSync(directoryPath)) {
        const files = fs.readdirSync(directoryPath);
        const audioFile = files.find((file) => path.extname(file).toLowerCase() === ".mp4");
        if (audioFile) {
            audioPath = path.join("/uploads", uniqueId, audioFile);
        }
    }
    return audioPath;
}

