import { NextResponse } from "next/server";

export function formatRoadmapResponse(roadmap: any) {
  return {
    _id: roadmap._id,
    phases: roadmap.phases,
    jobApplicationPhase: roadmap.jobApplicationPhase,
    jobApplicationMonth: roadmap.jobApplicationMonth,
    estimatedCompletionDate: roadmap.estimatedCompletionDate,
    timeframe: roadmap.timeframe,
    targetRole: roadmap.targetRole,
    currentSkills: roadmap.currentSkills,
    availableLearningTime: roadmap.availableLearningTime,
    regeneratedAt: roadmap.regeneratedAt,
  };
}

export function successResponse(
  data: any,
  message: string = "Success",
  status: number = 200
) {
  return NextResponse.json({ success: true, message, ...data }, { status });
}

export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ success: false, message }, { status });
}
