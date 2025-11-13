import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function ExperienceAndProjects({
  experienceAndProjects,
}: {
  experienceAndProjects?: string;
}) {
  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            Experience and Projects
          </h2>
          <p>Share your professional experience and notable projects</p>
        </div>

        <Button className="bg-orange-400">
          <Pen /> Edit
        </Button>
      </div>

      <Textarea
        className="mt-5 w-full h-40"
        placeholder="Add your brief experience and project descriptions"
        value={experienceAndProjects}
        readOnly
      />
    </div>
  );
}
