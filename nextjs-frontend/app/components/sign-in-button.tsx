import { useRouter } from "next/navigation";
import React from "react";

const SignInButton = () => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/home");
    console.log("Click");
  };
//Build
  return (
    <button
      onClick={goToHomePage}
      className="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-30 hover:border-white w-1/4 h-32 mt-40 text-4xl"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
