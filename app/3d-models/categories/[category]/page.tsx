import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import { getCategoryBySlug } from "@/lib/categories";
import {
  getModelBySlug,
  getModels,
  getModelsByCategorySlug,
} from "@/lib/models";
import { notFound } from "next/navigation";
import React from "react";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string; sort?: string; page: string }>;
}) {
  const { category } = await params;
  const sort = (await searchParams).sort?.toLowerCase() || "";
  const search = (await searchParams).search?.toLowerCase() || "";
  const page = Number((await searchParams).page) || 1;
  const result = getModels({ category, sort, search, page });
  if (!result.ok) {
    console.log(result.error);
    return <h1>500 internal DB error</h1>;
  }
  const categoryResult = getCategoryBySlug(category);

  if (!categoryResult.ok || !categoryResult.category) {
    notFound();
  }

  const categoryName = categoryResult.category.name;

  return (
    <ModelsBrowser search={search} name={categoryName} models={result.models} />
  );
}

export default page;
