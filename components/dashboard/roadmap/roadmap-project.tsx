import { Card, CardContent } from "@/components/ui/card";

interface RoadmapProjectProps {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function RoadmapProject({
  title,
  description,
  difficulty,
}: RoadmapProjectProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-start justify-between mb-2">
        <h5 className="font-medium">{title}</h5>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(
            difficulty
          )}`}
        >
          {difficulty}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
