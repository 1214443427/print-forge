import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import { getCategoryBySlug } from "@/lib/categories";
import { MODELS_PER_PAGE } from "@/lib/constants";
import { getSearchParams } from "@/lib/utils/getSearchParams";
import {
  getModelBySlug,
  getModels,
  getModelsByCategorySlug,
  getModelsCount,
} from "@/lib/models";
import { notFound, redirect } from "next/navigation";
import React from "react";
import {
  redirectOutBound,
  redirectToModels,
} from "@/lib/utils/redirectOutBound";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string; sort?: string; page: string }>;
}) {
  const { category } = await params;
  const resolvedParams = await searchParams;
  const { search, sort, page, pageString } = getSearchParams(resolvedParams);

  if (sort === null) {
    const urlParam = new URLSearchParams(
      resolvedParams as Record<string, string>,
    );
    urlParam.set("sort", "alpha");
    return redirectToModels(urlParam.toString(), category);
  }

  const result = getModels({
    category,
    sort,
    search,
    page,
    modelsPerPage: MODELS_PER_PAGE,
  });
  const countResult = getModelsCount({ search, category });
  const categoryResult = getCategoryBySlug(category);

  if (!result.ok || !countResult.ok || !categoryResult.ok) {
    return <h1>500 internal DB error</h1>;
  }

  if (!categoryResult.category) {
    notFound();
  }

  const categoryName = categoryResult.category.name;
  const totalPageNumber = Math.ceil(countResult.count / MODELS_PER_PAGE);

  redirectOutBound(
    { sort, search, page: pageString },
    totalPageNumber,
    category,
  );

  return (
    <ModelsBrowser
      search={search}
      categoryName={"3D Models"}
      currentPage={page}
      models={result.models}
      totalPageNumber={totalPageNumber}
    />
  );
}

export default page;
