import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { status, id } = req.body;
    const url = `http://your-server-url/api/products/${id}/${status === "Accept" ? "acceptPrice" : "rejectPrice"}`;

    try {
      const serverResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!serverResponse.ok) {
        throw new Error("Server response was not ok");
      }

      const data = await serverResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error updating price status" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
