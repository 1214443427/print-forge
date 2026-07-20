import ModelsGrid from "@/component/ModelsGrid";
import { getModelsByCategorySlug } from "@/lib/models";
import React from "react";

async function page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const result = getModelsByCategorySlug(category);
  if (!result.ok) {
    return <h1>500 internal DB error</h1>;
  }
  return (
    <div className="flex flex-col p-5 w-full sm:p-10">
      <div className="flex justify-between mb-5">
        <h1
          className="sr-only capitalize md:not-sr-only font-montserrat text-3xl font-bold my-5 mr-auto"
          aria-hidden
        >
          {category}
        </h1>
      </div>
      <ModelsGrid models={result.models} />
    </div>
  );
}

export default page;
