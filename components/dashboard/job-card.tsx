import { IJob } from "@/database/jobs.model";
import { MapPin, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialogTrigger } from "../ui/alert-dialog";
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

interface JobCardProps {
  job: IJob & {
    matchedSkills?: string[];
    score?: number;
    matchText?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="shadow-md p-6 rounded-2xl bg-linear-to-br from-blue-50">
      <div>
        <h3 className="text-2xl font-semibold">{job.title}</h3>
        <p className="text-lg font-medium">{job.company}</p>
      </div>

      {job.matchText && (
        <div className="mt-3 inline-block bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
          <p className="text-sm font-medium text-green-700">{job.matchText}</p>
        </div>
      )}

      <div className="w-full grid grid-cols-3 gap-6 mt-4">
        <p>{job.jobType}</p>
        <p className="flex items-center gap-2">
          <MapPin size={20} />
          <p className="text-blue-500">{job.location}</p>
        </p>
        <p className="text-orange-600">{job.experienceLevel}</p>
      </div>

      {job.matchedSkills && job.matchedSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Matched Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {job.matchedSkills.map((skill, index) => (
              <MatchedSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {job.requiredSkills && job.requiredSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Required Skills:
          </p>
          <div className="flex flex-wrap gap-3">
            {job.requiredSkills.map((skill, index) => (
              <SkillsCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5 w-full" size="lg" variant="default">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>
            <JobDetailsModal job={job} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
