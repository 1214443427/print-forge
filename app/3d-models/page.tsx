import ModelsBrowser from "@/component/ModelsBrowser";
import ModelsGrid from "@/component/ModelsGrid";
import { MODELS_PER_PAGE } from "@/lib/constants";
import {
  clampPage,
  getSearchParams,
  redirectToModels,
} from "@/lib/utils/utils";
import { getModels, getModelsCount } from "@/lib/models";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { search, sort, page, pageString } = getSearchParams(resolvedParams);

  const result = getModels({
    search,
    sort,
    page,
    modelsPerPage: MODELS_PER_PAGE,
  });
  const countResult = getModelsCount({ search });

  if (!result.ok || !countResult.ok) {
    return null;
  }

  const models = result.models;
  const totalPageNumber = Math.ceil(countResult.count / MODELS_PER_PAGE);

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
      categoryName={"3D Models"}
      currentPage={page}
      totalPageNumber={totalPageNumber}
    >
      <ModelsGrid models={models} type={search ? "compact" : "full"} />
    </ModelsBrowser>
  );
}

export default page;
