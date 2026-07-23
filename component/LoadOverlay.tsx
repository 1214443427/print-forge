import Image from "next/image";
import React from "react";

function LoadOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute flex flex-col justify-center items-center w-full h-full">
      <div
        className="bg-gray-300 w-full h-full absolute opacity-50"
        aria-hidden
      ></div>
      <h1 className="font-bold text-2xl text-orange-400 text-center mb-4 z-10">
        {children}
      </h1>
      <Image
        src="/img/spinner.svg"
        alt="Loading..."
        width={100}
        height={100}
        className="w-20 h-20 mx-auto z-10"
      />
    </div>
  );
}

export default LoadOverlay;
