import NavLink from "./NavLink";
import { getCategories } from "@/lib/categories";

function CategoryNavbar() {
  const result = getCategories();
  if (!result.ok) {
    return null;
  }

  const allLink = {
    name: "all",
    link: "/3d-models",
  };

  const categories = [
    allLink,
    ...result.categories.map(({ name, slug }) => ({
      name,
      link: `/3d-models/categories/${slug}`,
    })),
  ];

  return (
    <ul className="self-center px-5 flex md:flex-col w-full md:w-auto gap-5 overflow-scroll shrink-0  pb-2">
      {categories.map((category, index) => {
        // const isAllActive =
        //   category.slug === "all" && currentActivePath === "3d-models";
        // const isCategoryActive = currentActivePath === category.slug;
        // const active = isAllActive ||  isCategoryActive;
        return (
          <NavLink key={index} url={category.link} type={"category"}>
            {category.name}
          </NavLink>
        );
      })}
    </ul>
  );
}

export default CategoryNavbar;
