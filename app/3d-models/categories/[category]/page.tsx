import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import { getCategoryBySlug } from "@/lib/categories";
import { MODELS_PER_PAGE } from "@/lib/constants";
import { clampPage, getSearchParams } from "@/lib/utils/utils";
import { getModels, getModelsCount } from "@/lib/models";
import { notFound } from "next/navigation";
import { redirectToModels } from "@/lib/utils/utils";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string; sort?: string; page: string }>;
}) {
  const { category } = await params;
  const resolvedParams = await searchParams;
  const { search, sort, page, pageString } = getSearchParams(resolvedParams);

  const result = getModels({
    category,
    sort,
    search,
    page,
    modelsPerPage: MODELS_PER_PAGE,
  });
  const countResult = getModelsCount({ search, category });
  const categoryResult = getCategoryBySlug(category);

  if (!result.ok || !countResult.ok || !categoryResult.ok) {
    return <h1>500 internal DB error</h1>;
  }

  if (!categoryResult.category) {
    notFound();
  }

  const categoryName = categoryResult.category.name;
  const totalPageNumber = Math.ceil(countResult.count / MODELS_PER_PAGE);

  // redirectOutBound(
  //   { sort, search, page: pageString },
  //   totalPageNumber,
  //   category,
  // );

  const canonicalPage = clampPage(pageString, totalPageNumber);
  if (canonicalPage != page || isNaN(Number(pageString))) {
    redirectToModels(
      new URLSearchParams({ ...resolvedParams, page: String(canonicalPage) }),
    );
  }

  if (sort === null) {
    redirectToModels(new URLSearchParams({ ...resolvedParams, sort: "alpha" }));
  }

  return (
    <ModelsBrowser
      search={search}
      categoryName={categoryName}
      currentPage={page}
      totalPageNumber={totalPageNumber}
    >
      <ModelsGrid models={result.models} type={search ? "compact" : "full"} />
    </ModelsBrowser>
  );
}

export default page;
