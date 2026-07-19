import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeHolderImage from "@/public/img/placeholder.png";
import LikesWidget from "@/component/LikesWidget";
import TagPill from "@/component/TagPill";

function page() {
  return (
    <div className="flex flex-col justify-center items-center p-5 md:flex-row md:gap-10">
      <Link
        href={"/3d-models"}
        className="uppercase font-semibold  md:hidden text-sm text-gray-600 hover:text-orange-400"
      >
        BACK TO OVERVIEW
      </Link>
      <Image
        className="w-full"
        src={placeHolderImage.src}
        alt=""
        width={placeHolderImage.width}
        height={placeHolderImage.height}
      />
      <div className="flex flex-col justify-center h-full relative">
        <Link
          href={"/3d-models"}
          className="uppercase absolute top-0 font-semibold hidden md:block text-sm text-gray-600 hover:text-orange-400"
        >
          BACK TO OVERVIEW
        </Link>
        <section className="flex flex-col w-full mt-5 gap-4">
          <div aria-hidden>
            <LikesWidget likes={1789} style="large" />
            <h1 className="text-3xl font-bold text-gray-700">
              Printer Upgrade Kit
            </h1>
          </div>
          <div className="flex gap-2" aria-hidden>
            <TagPill tag="3D-printer" />
            <TagPill tag="Upgrade" />
          </div>
          <p className="text-2xl">
            Enhancement parts for 3D printer performance
          </p>
          <p className="hidden md:block text-gray-700">Added on 9/14/2024</p>
        </section>
      </div>
    </div>
  );
}

export default page;
