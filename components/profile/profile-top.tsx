"use client";

import { Pen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function ProfileTop({
  careerInterest,
  fullName,
  profession,
}: {
  careerInterest?: string;
  fullName?: string;
  profession?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [careerTrack, setCareerTrack] = useState(
    careerInterest?.replaceAll("-", " ") || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile/update-career-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          careerTrack: careerTrack.replaceAll(" ", "-").toLowerCase(),
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        // Optionally refresh the page or show a success message
        window.location.reload();
      } else {
        alert("Failed to update career track");
      }
    } catch (error) {
      console.error("Error updating career track:", error);
      alert("Error updating career track");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 flex space-x-8 items-center">
      <Image
        src="/images/abrar.jpg"
        alt="Profile picture"
        width={100}
        height={100}
        className="rounded-full border shadow-md"
      />

      <div>
        <h1 className="text-3xl font-bold">{fullName || "User"}</h1>
        <p className="text-muted-foreground mt-1">{profession || ""}</p>
      </div>

      <div className="ml-4">
        <h2 className="text-3xl font-bold text-blue-500">Career Interests</h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          {careerTrack.toUpperCase()}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="hover:text-blue-500 transition-colors">
                <Pen size={20} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Career Interest</DialogTitle>
                <DialogDescription>
                  Update your career track preference
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    id="career-track"
                    value={careerTrack}
                    onChange={(e) => setCareerTrack(e.target.value)}
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
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
        </p>
      </div>
    </div>
  );
}
