import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import { RoadmapPDF } from "./roadmap-pdf-document";
import type { IRoadmap } from "@/database/roadmap.model";

interface RoadmapDownloadButtonProps {
  roadmap: IRoadmap & { _id: string };
  isDownloading?: boolean;
}

export function RoadmapDownloadButton({
  roadmap,
  isDownloading = false,
}: RoadmapDownloadButtonProps) {
  const handleDownloadPDF = async () => {
    try {
      const pdfDocument = <RoadmapPDF roadmap={roadmap} />;
      const blob = await pdf(pdfDocument).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = `Career-Roadmap-${roadmap.targetRole.replace(
        /\s+/g,
        "-"
      )}-${Date.now()}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      disabled={isDownloading}
      variant="outline"
      className="gap-2"
    >
      <Download size={18} />
      {isDownloading ? "Generating PDF..." : "Download as PDF"}
    </Button>
  );
}
