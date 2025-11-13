export function getPaginationParams(request: Request) {
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationResponse(
  total: number,
  page: number,
  limit: number
) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
