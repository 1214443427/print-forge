import { redirect } from "next/navigation";

export function redirectOutBound(
  params: {
    sort?: string;
    search?: string;
    page?: string;
  },
  totalPageNumber: number,
  category?: string,
) {
  const searchParam = new URLSearchParams(params);
  const pageNumber = Number(params.page);
  if (params.page && (pageNumber < 1 || isNaN(pageNumber))) {
    searchParam.set("page", "1");
    redirectToModels(searchParam.toString(), category);
  } else if (pageNumber > totalPageNumber && totalPageNumber != 0) {
    searchParam.set("page", totalPageNumber.toString());
    redirectToModels(searchParam.toString(), category);
  }
}

export function redirectToModels(params?: string, category?: string) {
  if (category) {
    redirect(`/3d-models/categories/${category}?${params}`);
  } else {
    redirect(`/3d-models?${params}`);
  }
}
