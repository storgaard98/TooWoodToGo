import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64">
      <Image
        src="/starkLogo.png"
        alt="Image of STARK"
        layout="responsive"
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
