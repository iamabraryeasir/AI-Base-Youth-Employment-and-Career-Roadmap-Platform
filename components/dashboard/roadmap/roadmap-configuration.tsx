import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoadmapConfigurationProps {
  timeframe: number;
  availableLearningTime: string;
  onTimeframeChange: (value: number) => void;
  onAvailableLearningTimeChange: (value: string) => void;
  onGenerateClick: () => void;
  isGenerating: boolean;
}

export function RoadmapConfiguration({
  timeframe,
  availableLearningTime,
  onTimeframeChange,
  onAvailableLearningTimeChange,
  onGenerateClick,
  isGenerating,
}: RoadmapConfigurationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roadmap Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Clock size={16} className="inline mr-2" />
              Timeframe (Months)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={timeframe}
              onChange={(e) => onTimeframeChange(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Available Learning Time (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., 2-3 hours/day"
              value={availableLearningTime}
              onChange={(e) => onAvailableLearningTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <Button
          onClick={onGenerateClick}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Regenerating...
            </>
          ) : (
            <>
              <RefreshCw size={18} />
              Regenerate Roadmap
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
