import React from "react";
import Form from "next/form";

function SearchForm({ search }: { search: string }) {
  return (
    <Form action={"/3d-models"} className="w-full md:w-auto">
      <input
        id="search"
        name="search"
        defaultValue={search}
        autoComplete="off"
        className="w-full rounded-full border border-black py-1.5 px-4 placeholder:text-black"
        placeholder="Search for a model"
      ></input>
    </Form>
  );
}

export default SearchForm;
