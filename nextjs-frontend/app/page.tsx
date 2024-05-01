"use client";
// pages/index.tsx
import React from "react";


import type { Metadata } from "next";

import "./globals.css";

// These styles apply to every route in the application

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;

const HomePage = () => {
  
  const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;
  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <h1 className="text-4xl font-bold text-white">Hej Frede</h1>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert("Undskyld, hvis jeg har lavet kæmpe kaos i dine filer, men tailwind virker")}
      >
        Tryk her
      </button>

    </div>
  );
};

export default HomePage;
