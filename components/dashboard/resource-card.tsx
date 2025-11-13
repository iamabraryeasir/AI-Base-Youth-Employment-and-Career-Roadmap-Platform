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

interface ResourceCardProps {
  resource: IResource & {
    matchedSkills?: string[];
    score?: number;
    matchText?: string;
  };
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="shadow-md p-6 rounded-2xl bg-linear-to-br from-blue-50">
      <h3 className="text-2xl font-semibold">{resource.title}</h3>
      <div className="w-full flex items-center gap-5 mt-4">
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
        <div className="mt-3 inline-block bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
          <p className="text-sm font-medium text-green-700">
            {resource.matchText}
          </p>
        </div>
      )}

      {resource.matchedSkills && resource.matchedSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Matched Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {resource.matchedSkills.map((skill, index) => (
              <MatchedSkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {resource.relatedSkills && resource.relatedSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Related Skills:
          </p>
          <div className="flex flex-wrap gap-3">
            {resource.relatedSkills.map((skill, index) => (
              <SkillsCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-5">{resource.description}</p>

      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
        <Button className="mt-5 w-full" size="lg" variant="default">
          <ExternalLink size={16} className="mr-2" />
          View Resource
        </Button>
      </Link>
    </div>
  );
}
