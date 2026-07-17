import Link from "next/link";
import React from "react";

function CategoryNavbar({ categories }: { categories: string[] }) {
  return (
    <div>
      {categories.map((category) => (
        <Link href={`/${category}`}>{category}</Link>
      ))}
    </div>
  );
}

export default CategoryNavbar;
