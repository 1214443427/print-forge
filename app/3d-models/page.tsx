import ModelsGrid from "@/component/ModelsGrid";
import SearchForm from "@/component/SearchForm";
import React from "react";

function page() {
  return (
    <div className="flex flex-col p-5 sm:p-10 gap-5">
      <div className="flex justify-between">
        <h1
          className="sr-only md:not-sr-only font-montserrat text-3xl font-bold my-5"
          aria-hidden
        >
          3D models
        </h1>
        <SearchForm />
      </div>
      <ModelsGrid />
    </div>
  );
}

export default page;
