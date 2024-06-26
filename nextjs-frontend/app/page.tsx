"use client";
// pages/index.tsx
import React, { useEffect } from "react";
import LoginFormular from "./components/login-formular";
import Link from "next/link";
import SignInButton from "./components/sign-in-button";
import Logo from "./components/Logo";

const loginPage = () => {
  return (
    <div className="bg-stark-orange h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-8xl font-bold m-4">TooWoodToGo</h1>
      <LoginFormular />
      <Link href="./SignUp" className="label-text text-white pt-1 text-xl">
        Har du ikke en bruger <b>Opret en bruger</b>
      </Link>
      <SignInButton />
      <Logo />
    </div>
  );
};

export default loginPage;
