import React from "react";
import ModelCard from "./ModelCard";
import { Model } from "@/lib/types";

function ModelsGrid({ models }: { models: Model[] }) {
  const type = "compact";
  const testData = [
    {
      name: "Printer Upgrade Kit",
      description: "Enhancement parts for 3D printer performance",
      tag: "3D-printer",
      likes: 1789,
      imageUrl: "/img/models/1.jpg",
      slug: "1",
      type: "compact",
    },
    {
      name: "Printer Upgrade Kit",
      description: "Enhancement parts for 3D printer performance",
      tag: "3D-printer",
      likes: 1789,
      imageUrl: "/img/models/1.jpg",
      slug: "2",
      type: "compact",
    },
  ];
  return (
    <div
      className={`grid ${type === "compact" ? "grid-cols-2" : "grid-cols-1"} items-stretch md:grid-cols-[repeat(auto-fit,268px)] gap-5`}
    >
      {models.map((model) => (
        <ModelCard key={model.id} {...model} />
      ))}
    </div>
  );
}

export default ModelsGrid;
