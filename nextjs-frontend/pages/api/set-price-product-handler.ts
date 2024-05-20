import { NextApiRequest, NextApiResponse } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handlePriceSetRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { price, id: productId } = req.body;
    const priceSetUrl = `${apiUrl}/api/products/${productId}/setPrice`;
    try {
      const priceSetResponse = await fetch(priceSetUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }), // send the price in the body
      });

      if (!priceSetResponse.ok) {
        throw new Error("Server response was not ok");
      }

      const priceSetData = await priceSetResponse.json();
      res.status(200).json(priceSetData);
    } catch (error) {
      res.status(500).json({ error: "Error setting price" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
