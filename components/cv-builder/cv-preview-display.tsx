"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CVPreviewDisplayProps {
  profile: {
    fullName: string;
    careerTrack: string;
    experienceLevel: string;
    extractedSkills?: string[];
    extractedTools?: string[];
    education?: string;
    experienceAndProjectOverview?: string;
  };
  professionalSummary?: string;
}

export function CVPreviewDisplay({
  profile,
  professionalSummary,
}: CVPreviewDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{profile.fullName}</CardTitle>
          <CardDescription className="text-base">
            {profile.careerTrack} • {profile.experienceLevel}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Professional Summary */}
      {professionalSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {professionalSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {profile.extractedSkills && profile.extractedSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {profile.extractedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tools & Technologies */}
      {profile.extractedTools && profile.extractedTools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tools & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.extractedTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {profile.education && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{profile.education}</p>
          </CardContent>
        </Card>
      )}

      {/* Experience & Projects */}
      {profile.experienceAndProjectOverview && (
        <Card>
          <CardHeader>
            <CardTitle>Experience & Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              {profile.experienceAndProjectOverview}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
