import { IJob } from "@/database/jobs.model";
import { MapPin, CheckCircle } from "lucide-react";

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

interface JobDetailsModalProps {
  job: IJob & {
    matchedSkills?: string[];
    score?: number;
    matchText?: string;
  };
}

export default function JobDetailsModal({ job }: JobDetailsModalProps) {
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold text-black">{job.title}</h1>

      <div className="flex items-center gap-12 mt-3">
        <p className="text-lg">{job.company}</p>
        <p className="text-blue-500 flex items-center gap-2">
          <MapPin size={20} />
          {job.location}
        </p>
        <p className="text-orange-500">{job.experienceLevel}</p>
      </div>

      {job.matchText && (
        <div className="mt-4 inline-block bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
          <p className="text-sm font-medium text-green-700">{job.matchText}</p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-7">
        <p className="font-medium text-[16px]">Details Description</p>
        <p>{job.description}</p>
      </div>

      {job.matchedSkills && job.matchedSkills.length > 0 && (
        <div className="mt-5">
          <p className="font-medium text-[16px]">Your Matched Skills:</p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {job.matchedSkills.map((skill, index) => (
              <MatchedSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-medium text-[16px] mt-5">All Required Skills:</p>
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {job.requiredSkills.map((skill, index) => (
            <SkillsCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
