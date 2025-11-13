import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function CvAndAdditionalInfo() {
  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            CV And Additional Info
          </h2>
          <p>Paste your CV text or add additional notes for reference</p>
        </div>

        <Button className="bg-orange-400">
          <Pen />
          Edit
        </Button>
      </div>

      <Textarea
        className="mt-5 w-full h-40"
        placeholder="Add your CV or additional information here"
      />
    </div>
  );
}
