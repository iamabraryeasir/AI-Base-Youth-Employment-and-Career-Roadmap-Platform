"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lightbulb, Loader2, ChevronDown, X } from "lucide-react";

interface AISuggestionsProps {
  onSummaryGenerated?: (summary: string) => void;
  onImprovementTipsGenerated?: (tips: string[]) => void;
}

export function AISuggestions({
  onSummaryGenerated,
  onImprovementTipsGenerated,
}: AISuggestionsProps) {
  const [summary, setSummary] = useState<string>("");
  const [tips, setTips] = useState<string[]>([]);
  const [loadingAspect, setLoadingAspect] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["summary", "improvements"])
  );
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections);
    if (newSections.has(section)) {
      newSections.delete(section);
    } else {
      newSections.add(section);
    }
    setExpandedSections(newSections);
  };

  const generateSuggestion = async (aspect: string) => {
    setLoadingAspect(aspect);
    try {
      const response = await fetch("/api/cv-builder/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aspect }),
      });

      const data = await response.json();

      if (aspect === "summary") {
        setSummary(data.content);
        onSummaryGenerated?.(data.content);
      } else if (aspect === "improvements") {
        // Limit to first 2-3 tips
        const limitedTips = data.tips.slice(0, 3);
        setTips(limitedTips);
        onImprovementTipsGenerated?.(limitedTips);
        setShowTipsModal(true);
      }
    } catch (error) {
      console.error("Error generating suggestion:", error);
    } finally {
      setLoadingAspect(null);
    }
  };

  return (
    <>
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            AI Suggestions
          </CardTitle>
          <CardDescription>
            Get AI-powered suggestions to enhance your CV and professional
            presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Professional Summary */}
          <div className="border rounded-lg">
            <button
              onClick={() => toggleSection("summary")}
              className="flex items-center justify-between w-full p-3 hover:bg-white/50 transition-colors"
            >
              <span className="font-semibold text-sm">
                Professional Summary
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedSections.has("summary") ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections.has("summary") && (
              <div className="space-y-3 p-3 border-t">
                {summary ? (
                  <div className="bg-white p-3 rounded-md border border-blue-200 space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">
                      PROFESSIONAL SUMMARY
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {summary}
                    </p>
                    <button
                      onClick={() => setShowSummaryModal(true)}
                      className="text-xs text-blue-600 font-semibold hover:underline mt-2"
                    >
                      View full summary →
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Click the button to generate a professional summary
                  </p>
                )}
                <Button
                  onClick={() => generateSuggestion("summary")}
                  disabled={loadingAspect === "summary"}
                  size="sm"
                  className="w-full"
                >
                  {loadingAspect === "summary" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Summary"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* LinkedIn & Portfolio Recommendations */}
          <div className="border rounded-lg">
            <button
              onClick={() => toggleSection("improvements")}
              className="flex items-center justify-between w-full p-3 hover:bg-white/50 transition-colors"
            >
              <span className="font-semibold text-sm">
                LinkedIn & Portfolio Tips
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedSections.has("improvements") ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections.has("improvements") && (
              <div className="space-y-3 p-3 border-t">
                {tips.length > 0 ? (
                  <div className="bg-white p-3 rounded-md border border-blue-200 space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">
                      {tips.length} KEY RECOMMENDATIONS
                    </p>
                    {tips.slice(0, 1).map((tip, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-blue-600 font-semibold text-sm flex-shrink-0">
                          ✓
                        </span>
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowTipsModal(true)}
                      className="text-xs text-blue-600 font-semibold hover:underline mt-2"
                    >
                      View all {tips.length} tips →
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Click the button to get personalized recommendations
                  </p>
                )}
                <Button
                  onClick={() => generateSuggestion("improvements")}
                  disabled={loadingAspect === "improvements"}
                  size="sm"
                  className="w-full"
                >
                  {loadingAspect === "improvements" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Recommendations"
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Modal */}
      <Dialog open={showSummaryModal} onOpenChange={setShowSummaryModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Professional Summary</DialogTitle>
            <DialogDescription>
              Your AI-generated professional summary
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tips Modal */}
      <Dialog open={showTipsModal} onOpenChange={setShowTipsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>LinkedIn & Portfolio Tips</DialogTitle>
            <DialogDescription>
              {tips.length} key recommendations to enhance your professional
              presence
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto py-2">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <span className="text-blue-600 font-bold text-lg flex-shrink-0">
                  {idx + 1}.
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
