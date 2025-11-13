import { CroissantIcon, Plus, X } from "lucide-react";
import { Button } from "../ui/button";

const skills = ["JavaScript", "TypeScript", "React", "Node.js", "CSS", "HTML"];

function SkillTag({ skill }: { skill: string }) {
  return (
    <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded full inline-flex items-center gap-1">
      {skill}
      <X size={15} />
    </div>
  );
}

export default function SkillsAndExpertise() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            Skills and Expertise
          </h2>
          <p>Add your technical and professional skills</p>
        </div>
        <Button className="bg-orange-400">
          <Plus size={16} />
          Add Skills
        </Button>
      </div>

      <div className="mt-8">
        <p>Your Skills</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
