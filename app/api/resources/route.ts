import { NextResponse } from "next/server";
import { Resource } from "@/database/resource.model";
import { withApiProtection } from "@/lib/server/withApiProtection";
import {
  getPaginationParams,
  buildPaginationResponse,
} from "@/lib/server/pagination";
import { buildResourceFilters } from "@/lib/server/filters";

export async function GET(request: Request) {
  return withApiProtection(request, async () => {
    const { page, limit, skip } = getPaginationParams(request);
    const filters = buildResourceFilters(request);

    const total = await Resource.countDocuments(filters);

    const resources = await Resource.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: resources,
      pagination: buildPaginationResponse(total, page, limit),
    });
  });
}
