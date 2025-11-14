"use client";

import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CvAndAdditionalInfo({
  cvAndAdditionalInfo,
  extractedSkills = [],
  extractedTools = [],
  extractedRelevantRoled = [],
}: {
  cvAndAdditionalInfo?: string;
  extractedSkills?: string[];
  extractedTools?: string[];
  extractedRelevantRoled?: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(cvAndAdditionalInfo || "");
  const [isSaving, setIsSaving] = useState(false);
  const [extractedSkillsState, setExtractedSkillsState] =
    useState<string[]>(extractedSkills);
  const [extractedToolsState, setExtractedToolsState] =
    useState<string[]>(extractedTools);
  const [extractedRelevantRoledState, setExtractedRelevantRoledState] =
    useState<string[]>(extractedRelevantRoled);

  useEffect(() => {
    // Fetch profile to get the latest extracted fields from DB
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        const profile = data?.profile;
        if (!profile) return;
        setExtractedSkillsState(profile.extractedSkills || []);
        setExtractedToolsState(profile.extractedTools || []);
        setExtractedRelevantRoledState(profile.extractedRelevantRoled || []);
      } catch (err) {
        console.error("Failed to fetch profile for extracted fields:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update CV text
      const response = await fetch("/api/profile/update-cv-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CVText: text,
        }),
      });

      if (!response.ok) {
        alert("Failed to update CV and additional info");
        setIsSaving(false);
        return;
      }
      try {
        await response.json();
      } catch (err) {
        console.error("Error parsing response JSON:", err);
      }

      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating CV and additional info:", error);
      alert("Error updating CV and additional info");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            CV And Additional Info
          </h2>
          <p>Paste your CV text or add additional notes for reference</p>
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
              <DialogTitle>Edit CV And Additional Info</DialogTitle>
              <DialogDescription>
                Paste your CV text or add additional notes for reference
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your CV or additional information here"
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
        placeholder="Add your CV or additional information here"
        value={text}
        readOnly
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Extracted Skills</h3>
          {extractedSkillsState && extractedSkillsState.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {extractedSkillsState.map((s, idx) => (
                <span
                  key={`skill-${idx}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              No extracted skills yet.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Extracted Tools</h3>
          {extractedToolsState && extractedToolsState.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {extractedToolsState.map((t, idx) => (
                <span
                  key={`tool-${idx}`}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              No extracted tools yet.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Relevant Roles</h3>
          {extractedRelevantRoledState &&
          extractedRelevantRoledState.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {extractedRelevantRoledState.map((r, idx) => (
                <span
                  key={`role-${idx}`}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                >
                  {r}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              No relevant roles extracted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
