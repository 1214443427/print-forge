import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import { getCategoryBySlug } from "@/lib/categories";
import {
  getModelBySlug,
  getModels,
  getModelsByCategorySlug,
} from "@/lib/models";
import React from "react";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const { category } = await params;
  const sort = (await searchParams).sort?.toLowerCase() ?? "";
  const search = (await searchParams).search?.toLowerCase() ?? "";
  const result = getModels({ category, sort, search });
  if (!result.ok) {
    console.log(result.error);
    return <h1>500 internal DB error</h1>;
  }
  const categoryResult = getCategoryBySlug(category);

  if (!categoryResult.ok) {
    return <h1> 404 </h1>;
  }

  const categoryName = categoryResult.category.name;

  return (
    <ModelsBrowser search={search} name={categoryName} models={result.models} />
  );
}

export default page;
