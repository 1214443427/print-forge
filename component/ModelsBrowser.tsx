"use client";

import React, { useTransition } from "react";
import SearchForm from "./SearchForm";
import ModelsGrid from "./ModelsGrid";
import { getModels } from "@/lib/models";
import { Model } from "@/lib/types";
import PaginationControls from "./PaginationControls";

function ModelsBrowser({
  search,
  name,
  models,
  totalPageNumber,
}: {
  search?: string;
  name?: string;
  models: Model[];
  totalPageNumber: number;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col p-5 w-full sm:p-10">
      <div className="flex justify-between mb-5">
        <h1
          className="sr-only md:not-sr-only font-montserrat text-3xl font-bold my-5 mr-auto"
          aria-hidden
        >
          {search ? `Search results for "${search}"` : name}
        </h1>
        {/* <div className="flex flex-col w-full md:w-auto items-stretch"> */}
        <SearchForm search={search} startTransition={startTransition} />
        {/* </div> */}
      </div>
      <ModelsGrid
        models={models}
        isPending={isPending}
        startTransition={startTransition}
      />
      <PaginationControls totalPageNumber={totalPageNumber} />
    </div>
  );
}

export default ModelsBrowser;
