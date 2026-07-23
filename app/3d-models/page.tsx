import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import SearchForm from "@/component/SearchForm";
import { MODELS_PER_PAGE } from "@/lib/constants";
import { getSearchParams } from "@/lib/utils/getSearchParams";
import { getModels, getModelsCount } from "@/lib/models";
import React from "react";
import { redirect } from "next/navigation";
import { redirectOutBound } from "@/lib/utils/redirectOutBound";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { search, sort, page, pageString } = getSearchParams(resolvedParams);

  if (sort === null) {
    return redirect("/3d-models");
  }

  const result = getModels({
    search,
    sort,
    page,
    modelsPerPage: MODELS_PER_PAGE,
  });
  const countResult = getModelsCount({ search });

  if (!result.ok || !countResult.ok) {
    return null;
  }

  const models = result.models;
  const totalPageNumber = Math.ceil(countResult.count / MODELS_PER_PAGE);

  redirectOutBound({ sort, search, page: pageString }, totalPageNumber);

  return (
    <ModelsBrowser
      search={search}
      categoryName={"3D Models"}
      currentPage={page}
      models={models}
      totalPageNumber={totalPageNumber}
    />
  );
}

export default page;
