import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

interface product {
  title: string;
  description: string;
  quantity: string;
  productId: string;
}

interface UploadedImage {
  file: File;
  name: string; // Alt text for accessibility
  // Add more properties as needed
}

interface ProductInformationData {
  productName: string;
  description: string;
  quantity: number;
  audioBlob: Blob | null;
  images: UploadedImage[]; // Corrected type definition
}

const BACKEND_URL = "http://localhost:9000"; // Change this to your backend URL

async function fetchFromBackend(endpoint: string, options?: RequestInit) {
  const NextApiResponse = await fetch(
    `${BACKEND_URL}/api/${endpoint}`,
    options
  );
  const data = await NextApiResponse.json();
  return data;
}

export async function getAllProducts() {
  return fetchFromBackend("products");
}

export async function addProduct(productData: ProductInformationData) {
  console.log("Product Data: ", productData);

  // Call the storeImagesInDirectory function
  const uniqueId = await storeImagesInDirectory(productData.images);

  const newProductData = {
    title: productData.productName,
    description: productData.description,
    quantity: productData.quantity,
    productId: uniqueId, // Replace with the desired product ID or a function call that returns the product ID
  };

  return;

  /*   return fetchFromBackend("products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProductData),
  });
*/
}

export async function updateProduct(productId: string, productData: product) {
  return fetchFromBackend(`products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(productId: string) {
  return fetchFromBackend(`products/${productId}`, {
    method: "DELETE",
  });
}

export async function acceptPrice(productId: string) {
  return fetchFromBackend(`products/${productId}/acceptPrice`, {
    method: "PUT",
  });
}

export async function rejectPrice(productId: string) {
  return fetchFromBackend(`products/${productId}/rejectPrice`, {
    method: "PUT",
  });
}

export async function setPrice(productId: string, price: number) {
  return fetchFromBackend(`products/${productId}/setPrice`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price }),
  });
}

// Function to store images in public/uploads directory
async function storeImagesInDirectory(files: UploadedImage[]) {
  const uniqueId = generateUniqueId(); // Generate a unique id for the store
  const storeDirectory = path.join(process.cwd(), "public/uploads", uniqueId); // Create a directory path for the store

  // Create the directory if it doesn't exist
  if (!fs.existsSync(storeDirectory)) {
    fs.mkdirSync(storeDirectory, { recursive: true });
  }

  // Move the uploaded images to the store directory
  for (const uploadedImage of files) {
    const oldPath = uploadedImage.file.filepath; // Get the old file path
    const newFileName = `${uniqueId}-${uploadedImage.file.newFilename}`; // Create a new file name
    const newPath = path.join(storeDirectory, newFileName); // Create the new file path

    // Rename (move) the file
    fs.renameSync(oldPath, newPath);
  }

  return uniqueId; // Return the unique id of the store
}

function generateUniqueId() {
  // Generate a unique id using a combination of timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
