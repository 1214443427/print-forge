import Image from "next/image";
import Link from "next/link";
import React from "react";
import LikesWidget from "./LikesWidget";
import TagPill from "./TagPill";

function ModelCard({
  id,
  name,
  category,
  likes,
  description,
  image,
  type,
}: {
  id: number;
  name: string;
  category: string;
  likes: number;
  description: string;
  image: string;
  type?: string;
}) {
  //  ${type === "compact" ? "w-1/2" : "w-full"}
  return (
    <Link href={`3d-models/${id}`} className="w-fit h-full">
      <div className={`flex flex-col sm:w-67 rounded-2xl h-full`}>
        <Image
          src={image}
          width={268}
          height={268}
          alt={`Image of ${description}`}
          className="rounded-t-lg w-full object-cover"
        />

        <div className="flex flex-col border border-t-0 rounded-b-lg border-gray-300 p-3.5 gap-4 h-full">
          <h2 className="font-bold text-2xl">{name}</h2>
          {type !== "compact" && <p className="text-xl">{description}</p>}
          <div className="flex flex-col gap-4 mt-auto">
            <TagPill tag={category} />
            <LikesWidget likes={likes} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ModelCard;
