import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center pb-32">
      <p className="text-white text-4xl">powered by</p>
      <Image
        src="/starkLogo.png"
        alt="Image of STARK"
        width={400}
        height={400}
        className="pr-16"
      ></Image>
    </div>
  );
};

export default Logo;
