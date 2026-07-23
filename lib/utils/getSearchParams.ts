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

  return { search, sort, page, pageString: params.page };
}
