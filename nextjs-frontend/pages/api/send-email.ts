import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER_EMAIL as string;
const receiver = process.env.RESEND_RECEIVER_EMAIL as string;

let url = "";
if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
  url = process.env.NEXT_PUBLIC_VERCEL_URL as string;
} else {
  url = process.env.NEXT_PUBLIC_SITE_URL as string;
}
export default async function handlePriceStatusUpdateRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    if (req.method === "POST") {
      const { productId, productName, quantity, description } = req.body;

      if (!productId || !productName || !quantity || !description) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      resend.emails.send({
        from: sender,
        to: receiver,
        subject: `Nyt produkt tilbud:  ${productName} fra TKP BYG A/S`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #01346B;">
        <h1 style="color: #F5821E;">Tilbud modtaget fra TKP BYG A/S</h1>
        <h1 style="color: #001E3E;">${productName}</h1>
        <p style="margin-bottom: 10px; color: #657383;">${description}</p>
        <p style="margin-bottom: 10px; color: #657383;">Antal: ${quantity}</p>
        <p style="margin-bottom: 10px; color: #657383;">Telefonnummer: 12345678 </p>
        <p style="margin-bottom: 20px; color: #657383;">Email: ByggeMandBob@tkpbyg.dk </p>
        <a href="${url}/${productId}" style="background-color: #0CD1FD; color: white; text-decoration: none; padding: 10px 20px; margin-bottom: 20px; display: inline-block;">Vis tilbud</a>
        <p style="margin-bottom: 10px; color: #657383;">Med venlig hilsen,</p>
        <p style="margin-bottom: 0; color: #657383;">TooWoodToGo</p>
    </div>
`,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(405).json({ error: "Invalid request method" });
    }
  }
}
