import Image from "next/image";
import Link from "next/link";
import React from "react";
import LikesWidget from "./LikesWidget";
import TagPill from "./TagPill";

function ModelCard({
  name,
  tag,
  likes,
  description,
  imageUrl,
  slug,
  type,
}: {
  name: string;
  tag: string;
  likes: number;
  description: string;
  imageUrl: string;
  slug: string;
  type?: string;
}) {
  //  ${type === "compact" ? "w-1/2" : "w-full"}
  return (
    <Link href={`3d-models/${slug}`}>
      <div className={`flex flex-col sm:w-67 rounded-2xl`}>
        <Image
          src={imageUrl}
          width={268}
          height={268}
          alt={`Image of ${description}`}
          className="rounded-t-lg w-full object-cover"
        />

        <div className="flex flex-col border border-t-0 rounded-b-lg border-gray-300 p-3.5 gap-4">
          <h2 className="font-bold text-2xl">{name}</h2>
          {type === "compact" && <p className="text-xl">{description}</p>}
          <TagPill tag={tag} />
          <LikesWidget likes={likes} />
        </div>
      </div>
    </Link>
  );
}

export default ModelCard;
