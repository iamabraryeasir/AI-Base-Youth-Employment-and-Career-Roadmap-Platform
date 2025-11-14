import { AlertCircle } from "lucide-react";

interface RoadmapErrorStateProps {
  error: string;
}

export function RoadmapErrorState({ error }: RoadmapErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-600 mt-1" size={20} />
      <div>
        <h3 className="font-semibold text-red-900">Error</h3>
        <p className="text-red-800">{error}</p>
      </div>
    </div>
  );
}
