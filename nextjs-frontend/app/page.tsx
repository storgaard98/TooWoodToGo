"use client";
// pages/index.tsx
import React from "react";
import LoginFormula from "./components/LoginFormular";
import Link from "next/link";

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;

const loginPage = () => {
  return (
    <div className="bg-stark-orange">
      <LoginFormula />
      <Link href="./SignUp">
        Aren&rsquo;t you signed up yet? <b>Sign in</b>
      </Link>
    </div>
  );
};

export default loginPage;
