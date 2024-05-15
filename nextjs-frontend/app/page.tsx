"use client";
// pages/index.tsx
import React from "react";
import LoginFormular from "./components/login-formular";
import Link from "next/link";
import SignInButton from "./components/sign-in-button";
import Logo from "./components/Logo";

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;

const loginPage = () => {
  return (
    <div className="bg-stark-orange h-screen w-screen flex flex-col items-center justify-center">
      <LoginFormular />
      <Link href="./SignUp" className="label-text text-white pt-1 text-xl">
        Aren&rsquo;t you signed up yet? <b>Sign up</b>
      </Link>
      <SignInButton />
      <Logo />
    </div>
  );
};

export default loginPage;
