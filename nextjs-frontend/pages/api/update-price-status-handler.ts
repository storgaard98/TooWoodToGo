import { NextApiRequest, NextApiResponse } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handlePriceStatusUpdateRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { status: priceStatus, id: productId } = req.body;
    const priceUpdateUrl = `${apiUrl}/api/products/${productId}/${priceStatus === "Accept" ? "acceptPrice" : "rejectPrice"}`;

    try {
      const priceUpdateResponse = await fetch(priceUpdateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!priceUpdateResponse.ok) {
        throw new Error("Server response was not ok");
      }

      const priceUpdateData = await priceUpdateResponse.json();
      res.status(200).json(priceUpdateData);
    } catch (error) {
      res.status(500).json({ error: "Error updating price status" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
