import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TooWoodToGo",
  description: "Get rid of your waste",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
              <meta name="viewport" content="width=1170, height=2532, initial-scale=1.0" />

      <body className={inter.className}>{children}</body>
    </html>
  );
}
