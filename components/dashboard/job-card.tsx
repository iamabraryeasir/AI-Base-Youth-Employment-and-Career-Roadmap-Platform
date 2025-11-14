import { IJob } from "@/database/jobs.model";
import { MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import JobDetailsModal from "./job-details";

function SkillsCard({ skill }: { skill: string }) {
  return (
    <div className="bg-gray-200 text-sm px-3 py-1 rounded-full inline-block">
      {skill}
    </div>
  );
}

function MatchedSkillTag({ skill }: { skill: string }) {
  return (
    <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1">
      <CheckCircle size={14} />
      {skill}
    </div>
  );
}

function MissingSkillTag({ skill }: { skill: string }) {
  return (
    <div className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1">
      <AlertCircle size={14} />
      {skill}
    </div>
  );
}

function MatchPercentageBar({ percentage }: { percentage: number }) {
  const getColor = (percent: number) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 60) return "bg-yellow-500";
    if (percent >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold">Match Score</p>
        <p className="text-lg font-bold text-blue-600">{percentage}%</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface JobCardProps {
  job: IJob & {
    matchedSkills?: string[];
    missingSkills?: string[];
    matchPercentage?: number;
    score?: number;
    matchText?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
      <CardHeader>
        <h3 className="text-2xl font-semibold">{job.title}</h3>
        <p className="text-lg font-medium text-muted-foreground">
          {job.company}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        {job.matchPercentage !== undefined && (
          <MatchPercentageBar percentage={job.matchPercentage} />
        )}

        <div className="w-full grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <p className="font-medium">{job.jobType}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            <p className="text-blue-600">{job.location}</p>
          </div>
          <div>
            <p className="text-orange-600 font-medium">{job.experienceLevel}</p>
          </div>
        </div>

        {job.matchedSkills && job.matchedSkills.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2">
              Matched Skills ({job.matchedSkills.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {job.matchedSkills.map((skill, index) => (
                <MatchedSkillTag key={index} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {job.missingSkills && job.missingSkills.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-red-700 mb-2">
              Missing Skills ({job.missingSkills.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {job.missingSkills.map((skill, index) => (
                <MissingSkillTag key={index} skill={skill} />
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg" variant="default">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogDescription>
              <JobDetailsModal job={job} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
