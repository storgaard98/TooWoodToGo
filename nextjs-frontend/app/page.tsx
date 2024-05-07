"use client";
// pages/index.tsx
import React from "react";
import LoginFormula from "./components/loginFormula";
import Link from "next/link";

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;

const loginPage = () => {
  return (
    <div>
      <LoginFormula />
      <Link href="./SignUp">
        Aren&rsquo;t you signed up yet? <b>Sign in</b>
      </Link>
    </div>
  );
};

export default loginPage;
