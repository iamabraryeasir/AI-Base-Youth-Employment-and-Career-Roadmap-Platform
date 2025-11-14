"use client";

import { useEffect, useState } from "react";
import { RoadmapConfiguration } from "@/components/dashboard/roadmap/roadmap-configuration";
import { RoadmapOverview } from "@/components/dashboard/roadmap/roadmap-overview";
import { RoadmapPhasesList } from "@/components/dashboard/roadmap/roadmap-phases-list";
import { RoadmapEmptyState } from "@/components/dashboard/roadmap/roadmap-empty-state";
import { RoadmapErrorState } from "@/components/dashboard/roadmap/roadmap-error-state";
import type { IRoadmap } from "@/database/roadmap.model";

interface RoadmapData extends IRoadmap {
  _id: string;
  regeneratedAt?: Date;
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState(6);
  const [availableLearningTime, setAvailableLearningTime] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<number[]>([0]);

  // Fetch roadmap on mount
  useEffect(() => {
    fetchRoadmap();
  }, []);

  async function fetchRoadmap() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/roadmap", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success && data.roadmap) {
        setRoadmap(data.roadmap);
        setTimeframe(data.roadmap.timeframe);
        setAvailableLearningTime(data.roadmap.availableLearningTime || "");
      } else if (response.status === 404) {
        setRoadmap(null);
      } else {
        setError(data.message || "Failed to fetch roadmap");
      }
    } catch (err) {
      setError("Failed to fetch roadmap");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function generateRoadmap() {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          timeframe,
          availableLearningTime,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRoadmap(data.roadmap);
        setExpandedPhases([0]);
      } else {
        setError(data.message || "Failed to generate roadmap");
      }
    } catch (err) {
      setError("Failed to generate roadmap");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseNumber)
        ? prev.filter((p) => p !== phaseNumber)
        : [...prev, phaseNumber]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">Career Roadmap</h1>
          <p className="text-muted-foreground">
            Your personalized learning path to achieve your career goals
          </p>
        </div>
      </div>

      {error && <RoadmapErrorState error={error} />}

      {!roadmap ? (
        <RoadmapEmptyState
          isGenerating={isGenerating}
          onGenerateClick={generateRoadmap}
        />
      ) : (
        <>
          <RoadmapConfiguration
            timeframe={timeframe}
            availableLearningTime={availableLearningTime}
            onTimeframeChange={setTimeframe}
            onAvailableLearningTimeChange={setAvailableLearningTime}
            onGenerateClick={generateRoadmap}
            isGenerating={isGenerating}
          />

          <RoadmapOverview
            targetRole={roadmap.targetRole}
            timeframe={roadmap.timeframe}
            estimatedCompletionDate={roadmap.estimatedCompletionDate?.toString() || ""}
            jobApplicationMonth={roadmap.jobApplicationMonth}
          />

          <RoadmapPhasesList
            phases={roadmap.phases}
            expandedPhases={expandedPhases}
            jobApplicationPhase={roadmap.jobApplicationPhase}
            onTogglePhase={togglePhase}
          />
        </>
      )}
    </div>
  );
}
