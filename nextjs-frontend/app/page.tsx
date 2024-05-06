"use client";
// pages/index.tsx
import React from "react";
import LoginFormular from "./components/LoginFormular";
import Link from "next/link";
import SignInButton from "./components/SignInButton";

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;

const loginPage = () => {
  return (
    <div className="bg-stark-orange h-screen w-screen flex flex-col items-center justify-center">
      <LoginFormular />
      <Link href="./SignUp" className="label-text text-white pt-3 text-3xl">
        Aren&rsquo;t you signed up yet? <b>Sign up</b>
      </Link>
      <SignInButton />
    </div>
  );
};

export default loginPage;
