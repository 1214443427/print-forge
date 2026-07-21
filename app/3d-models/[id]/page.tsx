import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeHolderImage from "@/public/img/placeholder.png";
import LikesWidget from "@/component/LikesWidget";
import TagPill from "@/component/TagPill";
import { getModelBySlug } from "@/lib/models";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getModelBySlug(id);
  return (
    <div className="flex flex-col justify-center items-center p-5 md:flex-row md:gap-10">
      <Link
        href={"/3d-models"}
        className="uppercase font-semibold  md:hidden text-sm text-gray-600 hover:text-orange-400"
      >
        BACK TO OVERVIEW
      </Link>
      {result.ok ? (
        <>
          <Image
            className="w-full"
            src={result.model.image}
            alt={result.model.name}
            width={500}
            height={500}
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
                <LikesWidget likes={result.model.likes} style="large" />
                <h1 className="text-3xl font-bold text-gray-700">
                  {result.model.name}
                </h1>
              </div>
              <div className="flex gap-2" aria-hidden>
                <TagPill tag={result.model.category} />
              </div>
              <p className="text-2xl">{result.model.description}</p>
              <p className="hidden md:block text-gray-700">
                Added on {new Date(result.model.dateAdded).toLocaleDateString()}
              </p>
            </section>
          </div>
        </>
      ) : (
        <h1>404</h1>
      )}
    </div>
  );
}

export default page;
