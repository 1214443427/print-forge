import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

function CategoryNavbar({ categories }: { categories: string[] }) {
  return (
    <ul className="self-center px-5 flex md:flex-col gap-5 overflow-scroll shrink-0">
      {categories.map((category, index) => (
        <NavLink key={index} url={`/${category}`}>
          {category}
        </NavLink>
      ))}
    </ul>
  );
}

export default CategoryNavbar;
