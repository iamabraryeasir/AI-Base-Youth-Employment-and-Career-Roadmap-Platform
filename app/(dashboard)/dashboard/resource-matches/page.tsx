"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Target, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import ResourceCard from "@/components/dashboard/resource-card";
import type { IResource } from "@/database/resource.model";

interface SkillGaps {
  userSkills: string[];
  targetRole: string;
  experienceLevel: string;
  missingSkills: string[];
}

interface ResourceRecommendation extends IResource {
  coversMissingSkills: string[];
  relevanceScore: number;
}

export default function ResourceMatches() {
  const [resources, setResources] = useState<ResourceRecommendation[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGaps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendedResources() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/recommendations/resources", {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          setResources([]);
          setSkillGaps(null);
        } else if (data.success) {
          setResources(data.resources || []);
          setSkillGaps(data.skillGaps || null);
        }
      } catch (err) {
        setError("Failed to fetch resource recommendations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedResources();
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
      <h1 className="text-3xl font-bold mb-8">
        Learning Resources for Your Growth
      </h1>

      {skillGaps && (
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Skills Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-blue-600" size={24} />
              <h2 className="text-lg font-semibold text-blue-900">
                Your Current Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGaps.userSkills.length > 0 ? (
                skillGaps.userSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-blue-700">No skills added</span>
              )}
            </div>
            <p className="text-sm text-blue-700 mt-4">
              Total: {skillGaps.userSkills.length} skills
            </p>
          </div>

          {/* Target Role Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-purple-600" size={24} />
              <h2 className="text-lg font-semibold text-purple-900">
                Target Role
              </h2>
            </div>
            <p className="text-xl font-bold text-purple-700">
              {skillGaps.targetRole}
            </p>
            <p className="text-sm text-purple-600 mt-2">
              Experience Level: {skillGaps.experienceLevel}
            </p>
          </div>

          {/* Skill Gap Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-orange-600" size={24} />
              <h2 className="text-lg font-semibold text-orange-900">
                Missing Skills
              </h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-3">
              {skillGaps.missingSkills.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {skillGaps.missingSkills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
              {skillGaps.missingSkills.length > 3 && (
                <span className="text-orange-700 text-sm font-medium">
                  +{skillGaps.missingSkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Missing Skills Section */}
      {skillGaps && skillGaps.missingSkills.length > 0 && (
        <div className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">All Missing Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillGaps.missingSkills.map((skill) => (
              <span
                key={skill}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium border border-red-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resources Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Resources to Learn Missing Skills
        </h2>
        {resources.length > 0 ? (
          <div className="grid grid-cols-3 gap-10">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        ) : skillGaps && skillGaps.missingSkills.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
            <p className="text-lg">
              Excellent! Your skills align well with your target role.
            </p>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>
              No resources found yet for the identified skill gaps. Check back
              soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
