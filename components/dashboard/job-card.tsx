import { IJob } from "@/database/jobs.model";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";

function SkillsCard({ skill }: { skill: string }) {
  return (
    <div className="bg-gray-200 text-sm px-3 py-1 rounded-full inline-block">
      {skill}
    </div>
  );
}

export default function JobCard({ job }: { job: IJob }) {
  return (
    <div className="shadow-md p-6 rounded-2xl bg-linear-to-br from-blue-50">
      <h3 className="text-2xl font-semibold">{job.title}</h3>
      <div className="w-full grid grid-cols-3 gap-2 mt-4">
        <p className="text-lg font-medium">{job.company}</p>
        <p className="flex items-center gap-2">
          <MapPin size={20} />
          <p className="text-blue-500">{job.location}</p>
        </p>
        <p className="text-orange-500">{job.experienceLevel}</p>
      </div>
      {job.requiredSkills && job.requiredSkills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {job.requiredSkills.map((skill, index) => (
            <SkillsCard key={index} skill={skill} />
          ))}
        </div>
      )}
      <Button className="mt-6 w-full" size="lg" variant="default">
        View Details
      </Button>
    </div>
  );
}
