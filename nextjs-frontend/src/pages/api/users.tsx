// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
    target: "http://node-backend:9000",
    changeOrigin: true,
});

export default function handleProxyRequest(req: NextApiRequest, res: NextApiResponse) {
    console.log("Handling proxy request for:", req.url,); // log the request URL
    proxy(req, res, (result) => {
        if (result instanceof Error) {
            console.log("Proxy request failed with error:", result.message); // log the error message
            throw result;
        }
        console.log("Proxy request was successful"); // log a success message
        console.log(Proxy + " " + req.url);
        throw new Error(`Request '${req.url}' is not proxied!`);
    });
}
