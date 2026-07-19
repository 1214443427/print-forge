import ModelsGrid from "@/component/ModelsGrid";
import React from "react";

async function page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <div>
      <h1
        className="sr-only md:not-sr-only font-montserrat text-3xl font-bold my-5"
        aria-hidden
      >
        {category}
      </h1>
      <ModelsGrid />
    </div>
  );
}

export default page;
