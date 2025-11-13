"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import JobCard from "@/components/dashboard/job-card";
import type { IJob } from "@/database/jobs.model";

export default function JobMatches() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendedJobs() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/recommendations/jobs", {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          setJobs([]);
        } else if (data.success) {
          setJobs(data.matchedJobs || []);
        }
      } catch (err) {
        setError("Failed to fetch job recommendations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <AlertCircle size={64} className="text-yellow-600 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Skills Added</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go to Profile & Add Skills
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Job Matches Based on Your Skills
      </h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-3 gap-10">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>No matching jobs found. Check back later!</p>
        </div>
      )}
    </div>
  );
}
