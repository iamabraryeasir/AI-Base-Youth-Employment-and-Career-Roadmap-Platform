export interface JobPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchJobsResponse {
  success: boolean;
  data: any[];
  pagination: JobPagination;
  message?: string;
}

export async function fetchJobs(options?: {
  page?: number;
  limit?: number;
  search?: string;
  experienceLevel?: string;
  jobType?: string;
  location?: string;
  skill?: string;
}): Promise<FetchJobsResponse> {
  try {
    const params = new URLSearchParams();

    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.search) params.append("search", options.search);
    if (options?.experienceLevel)
      params.append("experienceLevel", options.experienceLevel);
    if (options?.jobType) params.append("jobType", options.jobType);
    if (options?.location) params.append("location", options.location);
    if (options?.skill) params.append("skill", options.skill);

    const url = `/api/jobs?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as FetchJobsResponse;
  } catch (error) {
    console.error("❌ Failed to fetch jobs:", error);

    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      message: "Failed to fetch jobs",
    };
  }
}
