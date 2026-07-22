import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import SearchForm from "@/component/SearchForm";
import { getModels, getModelsCount } from "@/lib/models";
import React from "react";

const modelsPerPage = 4;
async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string; page?: string }>;
}) {
  const search = (await searchParams).search?.toLowerCase() || "";
  const sort = (await searchParams).sort?.toLowerCase() || "";
  const page = Number((await searchParams).page) || 1;

  const result = getModels({ search, sort, page, modelsPerPage });
  const countResult = getModelsCount({ search });

  if (!result.ok || !countResult.ok) {
    return null;
  }

  const models = result.models;
  const totalPageNumber = Math.ceil(countResult.count / modelsPerPage);

  return (
    <ModelsBrowser
      search={search}
      name={"3D Models"}
      models={models}
      totalPageNumber={totalPageNumber}
    />
  );
}

export default page;
