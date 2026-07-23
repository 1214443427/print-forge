"use client";

import React, { useTransition } from "react";
import SearchForm from "./SearchForm";
import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import LoadingPage from "./LoadingPage";
import BrowserContext from "./ModelsBrowserContext";
import LoadOverlay from "./LoadOverlay";

function ModelsBrowser({
  search,
  categoryName,
  totalPageNumber,
  currentPage,
  children,
}: {
  search?: string;
  categoryName?: string;
  totalPageNumber: number;
  currentPage: number;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <BrowserContext value={{ isPending, startTransition }}>
      <div className="flex flex-col p-5 w-full sm:p-10">
        <div className="flex justify-between mb-5 ">
          <h1
            className="sr-only md:not-sr-only font-montserrat text-3xl font-bold my-5 mr-auto"
            aria-hidden
          >
            {search
              ? `Search results for "${search}"${categoryName === "3D Models" ? "" : ` in ${categoryName}`}`
              : categoryName}
          </h1>
          {/* <div className="flex flex-col w-full md:w-auto items-stretch"> */}
          <SearchForm search={search} />
          {/* </div> */}
        </div>
        <SortControls />
        <div className="relative flex w-full mb-2">
          {isPending && <LoadOverlay> Searching for models... </LoadOverlay>}
          {children}
        </div>
        <PaginationControls
          totalPageNumber={totalPageNumber}
          currentPage={currentPage}
        />
      </div>
    </BrowserContext>
  );
}

export default ModelsBrowser;
