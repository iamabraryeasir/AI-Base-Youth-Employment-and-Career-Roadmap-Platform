"use client";

import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ExperienceAndProjects({
  experienceAndProjects,
}: {
  experienceAndProjects?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(experienceAndProjects || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        "/api/profile/update-experience-and-projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experienceAndProjectOverview: text,
          }),
        }
      );

      if (response.ok) {
        setIsOpen(false);
        window.location.reload();
      } else {
        alert("Failed to update experience and projects");
      }
    } catch (error) {
      console.error("Error updating experience and projects:", error);
      alert("Error updating experience and projects");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            Experience and Projects
          </h2>
          <p>Share your professional experience and notable projects</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-500">
              <Pen size={16} />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Experience and Projects</DialogTitle>
              <DialogDescription>
                Share your professional experience and notable projects
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your brief experience and project descriptions"
                className="w-full min-h-48"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Textarea
        className="mt-5 w-full h-40"
        placeholder="Add your brief experience and project descriptions"
        value={text}
        readOnly
      />
    </div>
  );
}
