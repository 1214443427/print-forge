import React from "react";
import Form from "next/form";

function SearchForm() {
  return (
    <Form className="w-full md:w-auto">
      <input
        className="w-full md:w-auto rounded-full border border-black py-1.5 px-4 placeholder:text-black"
        placeholder="Search for a model"
      ></input>
    </Form>
  );
}

export default SearchForm;
