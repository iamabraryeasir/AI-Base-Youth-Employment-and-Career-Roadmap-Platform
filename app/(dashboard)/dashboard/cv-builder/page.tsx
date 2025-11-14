"use client";

import { useEffect, useState } from "react";
import { CVPreviewDisplay } from "@/components/cv-builder/cv-preview-display";
import { CVExportButton } from "@/components/cv-builder/cv-export-button";
import { AISuggestions } from "@/components/cv-builder/ai-suggestions";
import type { IProfile } from "@/database/profile.model";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileData extends IProfile {
  _id: string;
}

export default function CVBuilderPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [professionalSummary, setProfessionalSummary] = useState<string>("");
  const [improvementTips, setImprovementTips] = useState<string[]>([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/profile", {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.profile) {
        setProfile(data.profile);
      } else {
        setError("Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("An error occurred while fetching your profile");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">CV Builder</h1>
          <p className="text-muted-foreground">
            Create a professional CV with AI-powered suggestions
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
          </div>
          <div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-muted-foreground mt-2">
          {error || "Unable to load your profile"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">CV Builder</h1>
          <p className="text-muted-foreground">
            Create a professional CV with AI-powered suggestions
          </p>
        </div>
        <CVExportButton
          profile={profile}
          professionalSummary={professionalSummary}
          improvementTips={improvementTips}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main CV Preview */}
        <div className="lg:col-span-2">
          <CVPreviewDisplay
            profile={profile}
            professionalSummary={professionalSummary}
          />
        </div>

        {/* Sidebar - AI Suggestions */}
        <div>
          <AISuggestions
            onSummaryGenerated={setProfessionalSummary}
            onImprovementTipsGenerated={setImprovementTips}
          />
        </div>
      </div>
    </div>
  );
}
