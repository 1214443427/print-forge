"use client";

import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

function CategoryNavbar({ categories }: { categories: string[] }) {
  const pathname = usePathname();
  const currentActivePath = pathname.split("/").at(-1);
  return (
    <ul className="self-center px-5 flex md:flex-col gap-5 overflow-scroll shrink-0">
      {categories.map((category, index) => {
        const isAllActive =
          category === "all" && currentActivePath === "3d-models";
        const isCategoryActive = currentActivePath === category;
        const active = isAllActive || isCategoryActive;
        return (
          <NavLink key={index} url={`/${category}`} active={active}>
            {category}
          </NavLink>
        );
      })}
    </ul>
  );
}

export default CategoryNavbar;
