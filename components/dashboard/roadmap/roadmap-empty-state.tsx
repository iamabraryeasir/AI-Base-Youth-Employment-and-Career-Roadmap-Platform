import { Target, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RoadmapEmptyStateProps {
  isGenerating: boolean;
  onGenerateClick: () => void;
}

export function RoadmapEmptyState({
  isGenerating,
  onGenerateClick,
}: RoadmapEmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <Target size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-semibold mb-2">No Roadmap Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create your personalized career roadmap to get a step-by-step
            learning plan tailored to your goals.
          </p>
          <Button
            onClick={onGenerateClick}
            disabled={isGenerating}
            size="lg"
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Calendar size={18} />
                Generate Roadmap
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
