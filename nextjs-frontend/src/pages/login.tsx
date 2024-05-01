import React from "react";
import LoginFormular from "./LoginFormular";
import Link from "next/link";
import SignUp from "./SignUp";
const login = () => {
  return (
    <div>
      <LoginFormular />
      <Link href="./SignUp">
        Aren't you signed up yet? <b>Sign in</b>
      </Link>
    </div>
  );
};

export default login;
