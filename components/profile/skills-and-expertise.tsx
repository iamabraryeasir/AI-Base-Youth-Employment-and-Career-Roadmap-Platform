"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function SkillTag({
  skill,
  onDelete,
}: {
  skill: string;
  onDelete: (skill: string) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full inline-flex items-center gap-2">
        {skill}
        <button
          onClick={() => setShowConfirm(true)}
          className="hover:text-red-600 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{skill}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(skill);
                setShowConfirm(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function SkillsAndExpertise({ skills }: { skills?: string[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      alert("Please enter a skill");
      return;
    }

    if (currentSkills.includes(newSkill.trim())) {
      alert("This skill already exists");
      return;
    }

    setIsSaving(true);
    try {
      const updatedSkills = [...currentSkills, newSkill.trim()];
      const response = await fetch("/api/profile/update-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });

      if (response.ok) {
        setCurrentSkills(updatedSkills);
        setNewSkill("");
        setIsAddOpen(false);
      } else {
        alert("Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Error adding skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (skillToDelete: string) => {
    setIsSaving(true);
    try {
      const updatedSkills = currentSkills.filter((s) => s !== skillToDelete);
      const response = await fetch("/api/profile/update-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });

      if (response.ok) {
        setCurrentSkills(updatedSkills);
      } else {
        alert("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Error deleting skill");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            Skills and Expertise
          </h2>
          <p>Add your technical and professional skills</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-500">
              <Plus size={16} />
              Add Skills
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Enter a new skill to add to your profile
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  id="skill-input"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., React, TypeScript, etc."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddSkill();
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddSkill} disabled={isSaving}>
                  {isSaving ? "Adding..." : "Add Skill"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <p>Your Skills</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {currentSkills.length > 0 ? (
            currentSkills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                onDelete={handleDeleteSkill}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              No skills added yet. Click "Add Skills" to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
