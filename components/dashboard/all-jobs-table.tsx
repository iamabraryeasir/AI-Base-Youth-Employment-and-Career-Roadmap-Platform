"use client";

import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/server/fetchJobs";
import type { IJob } from "@/database/jobs.model";
import JobCard from "./job-card";
import PaginationControls from "./pagination-controls";

export default function AllJobsTable() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadJobs() {
      setIsLoading(true);
      try {
        const response = (await fetchJobs({ page: currentPage, limit: 9 })) as {
          success: boolean;
          data: IJob[];
          pagination: any;
        };

        if (response.success) {
          setJobs(response.data);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  const totalPages = pagination?.totalPages || 1;

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <div className="col-span-3 text-center py-10 text-muted-foreground">
            No jobs found
          </div>
        )}
      </div>
      {jobs.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
