"use client";

import { useEffect, useState } from "react";
import { fetchResources } from "@/lib/server/fetchResources";
import type { IResource } from "@/database/resource.model";
import ResourceCard from "./resource-card";
import PaginationControls from "./pagination-controls";

export default function AllResourcesTable() {
  const [resources, setResources] = useState<IResource[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadResources() {
      setIsLoading(true);
      try {
        const response = await fetchResources({ page: currentPage, limit: 9 });

        if (response.success) {
          setResources(response.data as IResource[]);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadResources();
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
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-muted-foreground">
            No resources found
          </div>
        )}
      </div>
      {resources.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
