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
  // if (search) {
  //   models = models.filter(
  //     (model) =>
  //       model.name.includes(search) ||
  //       model.description.includes(search) ||
  //       model.category.includes(search),
  //   );
  // }
  return (
    <div className="flex flex-col p-5 w-full sm:p-10">
      <div className="flex justify-between mb-5">
        <h1
          className="sr-only md:not-sr-only font-montserrat text-3xl font-bold my-5 mr-auto"
          aria-hidden
        >
          {search ? `Search results for "${search}"` : "3D models"}
        </h1>
        {/* <div className="flex flex-col w-full md:w-auto items-stretch"> */}
        <SearchForm search={search} />
        {/* </div> */}
      </div>
      <ModelsGrid models={models} />
    </div>
  );
}

export default page;
