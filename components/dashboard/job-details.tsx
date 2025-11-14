import { IJob } from "@/database/jobs.model";
import { MapPin, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

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

function MatchPercentageDisplay({ percentage }: { percentage: number }) {
  const getColor = (percent: number) => {
    if (percent >= 80) return "text-green-600";
    if (percent >= 60) return "text-yellow-600";
    if (percent >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Overall Match Score</p>
        <p className={`text-3xl font-bold ${getColor(percentage)}`}>
          {percentage}%
        </p>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
        <div
          className={`h-3 rounded-full ${
            percentage >= 80
              ? "bg-green-500"
              : percentage >= 60
              ? "bg-yellow-500"
              : percentage >= 40
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface JobDetailsModalProps {
  job: IJob & {
    matchedSkills?: string[];
    missingSkills?: string[];
    matchPercentage?: number;
    score?: number;
    matchText?: string;
  };
}

export default function JobDetailsModal({ job }: JobDetailsModalProps) {
  const handleApply = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank");
    } else {
      alert("Apply URL not available for this job");
    }
  };

  return (
    <div className="text-black space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-black">{job.title}</h1>

        <div className="flex items-center gap-6 mt-3 flex-wrap">
          <p className="text-lg font-medium">{job.company}</p>
          <p className="text-blue-500 flex items-center gap-2">
            <MapPin size={20} />
            {job.location}
          </p>
          <p className="text-orange-600 font-medium">{job.experienceLevel}</p>
          {job.jobType && (
            <p className="text-gray-700 font-medium">{job.jobType}</p>
          )}
        </div>

        {job.jobPlatform && (
          <p className="text-sm text-gray-600 mt-2">
            Posted on: <span className="font-semibold">{job.jobPlatform}</span>
          </p>
        )}
      </div>

      {job.matchPercentage !== undefined && (
        <MatchPercentageDisplay percentage={job.matchPercentage} />
      )}

      <div>
        <p className="font-semibold text-[16px]">Job Description</p>
        <p className="text-gray-700 mt-2">{job.description}</p>
      </div>

      {job.matchedSkills && job.matchedSkills.length > 0 && (
        <div>
          <p className="font-semibold text-[16px] text-green-700">
            Your Matched Skills ({job.matchedSkills.length}):
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {job.matchedSkills.map((skill, index) => (
              <MatchedSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {job.missingSkills && job.missingSkills.length > 0 && (
        <div>
          <p className="font-semibold text-[16px] text-red-700">
            Skills to Develop ({job.missingSkills.length}):
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {job.missingSkills.map((skill, index) => (
              <MissingSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t">
        <Button
          onClick={handleApply}
          className="flex-1 gap-2"
          size="lg"
          variant="default"
        >
          <ExternalLink size={18} />
          Apply Now
        </Button>
      </div>
    </div>
  );
}
