import { redirect } from "next/navigation";

// export function redirectOutBound(
//   params: {
//     sort?: string;
//     search?: string;
//     page?: string;
//   },
//   totalPageNumber: number,
//   category?: string,
// ) {
//   const searchParam = new URLSearchParams(params);
//   const pageNumber = Number(params.page);
//   if (params.page && (pageNumber < 1 || isNaN(pageNumber))) {
//     searchParam.set("page", "1");
//     redirectToModels(searchParam.toString(), category);
//   } else if (pageNumber > totalPageNumber && totalPageNumber != 0) {
//     searchParam.set("page", totalPageNumber.toString());
//     redirectToModels(searchParam.toString(), category);
//   }
// }

export function urlBuilder(params?: URLSearchParams, category?: string) {
  const base = category ? `/3d-models/categories/${category}` : "/3d-models";
  const searchParams = params?.toString();
  return searchParams ? `${base}?${searchParams}` : base;
}

export function clampPage(page: string, totalPageNumber: number) {
  const pageNumber = Number(page);
  if (pageNumber < 1 || totalPageNumber === 0 || Number.isNaN(pageNumber)) {
    return 1;
  }
  return Math.min(pageNumber, totalPageNumber);
}

export function redirectToModels(
  params?: URLSearchParams,
  category?: string,
): never {
  const url = urlBuilder(params, category);
  redirect(url);
}

export function getSearchParams(searchParams: {
  search?: string;
  sort?: string;
  page?: string;
}) {
  const params = searchParams;
  const search = params.search?.toLowerCase() || "";
  const sortValue = params.sort?.toLowerCase() || "";
  const page = Number(params.page) || 1;

  const sort = ["alpha", "popular", "recent", ""].includes(sortValue)
    ? sortValue
    : null;

  return { search, sort, page, pageString: params.page || "" };
}
