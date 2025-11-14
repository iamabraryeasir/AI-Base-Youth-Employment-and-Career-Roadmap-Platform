"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IProfile } from "@/database/profile.model";

interface CVExportButtonProps {
  profile: IProfile & { _id: string };
  professionalSummary?: string;
  improvementTips?: string[];
  isLoading?: boolean;
}

export function CVExportButton({
  profile,
  professionalSummary,
  improvementTips,
  isLoading = false,
}: CVExportButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Import dynamically to avoid SSR issues
      const { pdf } = await import("@react-pdf/renderer");
      const { CVPreview } = await import("./cv-preview");

      // Create the PDF document
      const doc = (
        <CVPreview
          profile={profile}
          professionalSummary={professionalSummary}
          improvementTips={improvementTips}
        />
      );

      // Convert to blob
      console.log("Starting PDF generation...");
      const blob = await pdf(doc).toBlob();
      console.log("PDF blob created:", blob?.size);

      if (!blob || blob.size === 0) {
        throw new Error("PDF generation resulted in empty blob");
      }

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CV-${profile.fullName.replace(
        /\s+/g,
        "-"
      )}-${Date.now()}.pdf`;

      // Append to body, click, and remove
      document.body.appendChild(link);
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      console.log("PDF download triggered successfully");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert(
        "Failed to generate PDF. " +
          (error instanceof Error ? error.message : "Please try again.")
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      disabled={isDownloading || isLoading}
      className="gap-2"
    >
      {isDownloading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download size={18} />
          Download CV as PDF
        </>
      )}
    </Button>
  );
}
