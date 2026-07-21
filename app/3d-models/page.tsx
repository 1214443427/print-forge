import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import SearchForm from "@/component/SearchForm";
import { getModels } from "@/lib/models";
import React from "react";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const search = (await searchParams).search?.toLowerCase() || "";
  const sort = (await searchParams).sort?.toLowerCase() || "";
  const result = getModels({ search, sort });
  if (!result.ok) {
    return null;
  }
  const models = result.models;
  return <ModelsBrowser search={search} name={"3D Models"} models={models} />;
}

export default page;
