"use client";

import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/server/fetchJobs";
import type { IJob } from "@/database/jobs.model";
import JobCard from "./job-card";

export default function AllJobsTable() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      const response = (await fetchJobs({ page: 1, limit: 9 })) as {
        success: boolean;
        data: IJob[];
        pagination: any;
      };

      if (response.success) {
        setJobs(response.data);
        setPagination(response.pagination);
      }
    }

    loadJobs();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-10">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
