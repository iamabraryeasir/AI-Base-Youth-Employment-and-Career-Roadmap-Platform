import { IJob } from "@/database/jobs.model";
import { MapPin } from "lucide-react";

function SkillsCard({ skill }: { skill: string }) {
  return (
    <div className="bg-gray-200 text-sm px-3 py-1 rounded-full inline-block">
      {skill}
    </div>
  );
}

export default function JobDetailsModal({ job }: { job: IJob }) {
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

      <div className="flex flex-col gap-2 mt-7">
        <p className="font-medium text-[16px]">Details Description</p>
        <p>{job.description}</p>
      </div>

      <div>
        <p className="font-medium text-[16px] mt-5">Required Skills:</p>
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {job.requiredSkills.map((skill, index) => (
            <SkillsCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
