import { AlertCircle, Calendar, Target, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RoadmapOverviewProps {
  targetRole: string;
  timeframe: number;
  estimatedCompletionDate: string;
  jobApplicationMonth: number;
}

export function RoadmapOverview({
  targetRole,
  timeframe,
  estimatedCompletionDate,
  jobApplicationMonth,
}: RoadmapOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Target className="mx-auto mb-2 text-blue-600" size={32} />
            <p className="text-sm text-muted-foreground">Target Role</p>
            <p className="text-lg font-semibold">{targetRole}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Clock className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-sm text-muted-foreground">Timeframe</p>
            <p className="text-lg font-semibold">{timeframe} months</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Calendar className="mx-auto mb-2 text-purple-600" size={32} />
            <p className="text-sm text-muted-foreground">Completion</p>
            <p className="text-lg font-semibold">
              {new Date(estimatedCompletionDate).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-2 text-orange-600" size={32} />
            <p className="text-sm text-muted-foreground">Start Applying</p>
            <p className="text-lg font-semibold">Month {jobApplicationMonth}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
