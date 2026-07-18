import Image from "next/image";
import Link from "next/link";
import React from "react";

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
          <p className="border border-gray-300 w-fit px-2.5 py-0.5 rounded-full">
            {tag}
          </p>
          <div aria-hidden className="flex items-center gap-1.5">
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5022 16.0512L17.7286 8.82479C19.504 7.04049 19.7627 4.12316 18.0854 2.25856C17.6648 1.78867 17.1528 1.40948 16.5807 1.14416C16.0085 0.878837 15.3883 0.732951 14.7579 0.715417C14.1275 0.697882 13.5001 0.809067 12.9141 1.04218C12.3281 1.27529 11.7958 1.62543 11.3497 2.07121L9.99364 3.4362L8.82492 2.25856C7.04061 0.483181 4.12328 0.224457 2.25868 1.9017C1.7888 2.32234 1.40961 2.83436 1.14428 3.40649C0.878959 3.97862 0.733073 4.59884 0.715539 5.22926C0.698004 5.85967 0.809189 6.48704 1.0423 7.07303C1.27541 7.65903 1.62555 8.19134 2.07133 8.63744L9.48511 16.0512C9.62043 16.1852 9.80318 16.2604 9.99364 16.2604C10.1841 16.2604 10.3668 16.1852 10.5022 16.0512V16.0512Z"
                stroke="#A1A1A1"
                strokeWidth="1.42744"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-gray-600">{likes}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ModelCard;
