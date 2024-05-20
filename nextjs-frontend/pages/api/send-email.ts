import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER_EMAIL as string;
const receiver = process.env.RESEND_RECEIVER_EMAIL as string;
const url = process.env.NEXT_PUBLIC_SITE_URL as string;

//TODO: Fix link to offer
//TODO Remember to add to env

export default async function handlePriceStatusUpdateRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("");
  console.log("");
  console.log("env");
  console.log("sender: ", sender, "receiver: ", receiver, "url:", url);
  console.log("");
  console.log("");
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
        subject: `New offer on ${productName} from TKP BYG A/S`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #444;">Offer received from TKP BYG A/S</h1>
        <h1 style="color: #555;">${productName}</h1>
        <p style="margin-bottom: 10px;">${description}</p>
        <p style="margin-bottom: 10px;">Quantity: ${quantity}</p>
        <p style="margin-bottom: 10px;">Phone: 12345678 </p>
        <p style="margin-bottom: 20px;">Email: BobTheBuilder@tkpbyg.dk </p>
        <a href="${url}/${productId}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; margin-bottom: 20px; display: inline-block;">View offer</a>
        <p style="margin-bottom: 10px;">Best regards,</p>
        <p style="margin-bottom: 0;">TooWoodToGo</p>
</div>
`,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(405).json({ error: "Invalid request method" });
    }
  }
}
