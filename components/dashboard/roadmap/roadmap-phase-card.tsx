import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoadmapProject } from "./roadmap-project";
import type { IRoadmapPhase } from "@/database/roadmap.model";

interface RoadmapPhaseCardProps {
  phase: IRoadmapPhase;
  isExpanded: boolean;
  jobApplicationPhase: number;
  onToggle: (phaseNumber: number) => void;
}

export function RoadmapPhaseCard({
  phase,
  isExpanded,
  jobApplicationPhase,
  onToggle,
}: RoadmapPhaseCardProps) {
  return (
    <Card>
      <div
        className="cursor-pointer"
        onClick={() => onToggle(phase.phaseNumber)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  {phase.phaseNumber}
                </div>
                <div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {phase.duration}
                  </p>
                </div>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="text-muted-foreground" />
            ) : (
              <ChevronDown className="text-muted-foreground" />
            )}
          </div>
        </CardHeader>
      </div>

      {isExpanded && (
        <CardContent className="space-y-6 border-t pt-6">
          <div>
            <p className="text-muted-foreground">{phase.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Topics to Learn</h4>
            <div className="flex flex-wrap gap-2">
              {phase.topics.map((topic) => (
                <span
                  key={topic}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {phase.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Projects</h4>
            <div className="space-y-3">
              {phase.projects.map((project, idx) => (
                <RoadmapProject
                  key={idx}
                  title={project.title}
                  description={project.description}
                  difficulty={project.difficulty}
                />
              ))}
            </div>
          </div>

          {phase.phaseNumber === jobApplicationPhase && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-orange-900">
                💼 Start applying for jobs/internships in this phase!
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
