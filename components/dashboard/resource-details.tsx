import type { IResource } from "@/database/resource.model";
import { ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
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

interface ResourceDetailsModalProps {
  resource: IResource & {
    matchedSkills?: string[];
    score?: number;
    matchText?: string;
  };
}

export default function ResourceDetailsModal({
  resource,
}: ResourceDetailsModalProps) {
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold text-black">{resource.title}</h1>

      <div className="flex items-center gap-12 mt-3">
        <p className="text-lg font-medium">{resource.platform}</p>
        <p
          className={`${
            resource.cost === "Free" ? "text-green-600" : "text-orange-600"
          }`}
        >
          {resource.cost}
        </p>
      </div>

      {resource.matchText && (
        <div className="mt-4 inline-block bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
          <p className="text-sm font-medium text-green-700">
            {resource.matchText}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-7">
        <p className="font-medium text-[16px]">Description</p>
        <p>{resource.description}</p>
      </div>

      {resource.matchedSkills && resource.matchedSkills.length > 0 && (
        <div className="mt-5">
          <p className="font-medium text-[16px]">Your Matched Skills:</p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {resource.matchedSkills.map((skill, index) => (
              <MatchedSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {resource.relatedSkills && resource.relatedSkills.length > 0 && (
        <div className="mt-5">
          <p className="font-medium text-[16px]">All Related Skills:</p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {resource.relatedSkills.map((skill, index) => (
              <SkillsCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      <Link
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 w-full"
      >
        <Button size="lg" variant="default" className="w-full">
          <ExternalLink size={16} className="mr-2" />
          Visit Resource
        </Button>
      </Link>
    </div>
  );
}
