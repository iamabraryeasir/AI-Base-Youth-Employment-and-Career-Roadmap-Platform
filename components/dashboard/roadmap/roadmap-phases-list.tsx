import { RoadmapPhaseCard } from "./roadmap-phase-card";
import type { IRoadmapPhase } from "@/database/roadmap.model";

interface RoadmapPhasesListProps {
  phases: IRoadmapPhase[];
  expandedPhases: number[];
  jobApplicationPhase: number;
  onTogglePhase: (phaseNumber: number) => void;
}

export function RoadmapPhasesList({
  phases,
  expandedPhases,
  jobApplicationPhase,
  onTogglePhase,
}: RoadmapPhasesListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Learning Phases</h2>
      {phases.map((phase: IRoadmapPhase) => (
        <RoadmapPhaseCard
          key={phase.phaseNumber}
          phase={phase}
          isExpanded={expandedPhases.includes(phase.phaseNumber)}
          jobApplicationPhase={jobApplicationPhase}
          onToggle={onTogglePhase}
        />
      ))}
    </div>
  );
}
