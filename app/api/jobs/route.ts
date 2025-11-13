import { NextResponse } from "next/server";
import { Job } from "@/database/jobs.model";
import { withApiProtection } from "@/lib/server/withApiProtection";
import {
  getPaginationParams,
  buildPaginationResponse,
} from "@/lib/server/pagination";
import { buildJobFilters } from "@/lib/server/filters";

export async function GET(request: Request) {
  return withApiProtection(request, async () => {
    const { page, limit, skip } = getPaginationParams(request);
    const filters = buildJobFilters(request);

    const total = await Job.countDocuments(filters);

    const jobs = await Job.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: buildPaginationResponse(total, page, limit),
    });
  });
}
