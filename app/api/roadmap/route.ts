import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { generateRoadmapWithAI } from "@/lib/roadmap/generate-roadmap";
import {
  createOrUpdateRoadmap,
  fetchUserRoadmap,
} from "@/lib/roadmap/roadmap-service";
import { validateUserProfile } from "@/lib/roadmap/profile-validator";
import {
  successResponse,
  errorResponse,
  formatRoadmapResponse,
} from "@/lib/roadmap/response-handler";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return errorResponse("Unauthorized", 401);
    }

    await connectDB();

    const profile = await validateUserProfile({
      userId: session.user.id,
      shouldCheckSkills: true,
    });

    const body = await request.json();
    const timeframe = body.timeframe || 6;
    const availableLearningTime = body.availableLearningTime || "";
    const userSkills = profile.skills || [];

    // Generate roadmap using AI
    const roadmapData = await generateRoadmapWithAI({
      currentSkills: userSkills,
      targetRole: profile.careerTrack,
      timeframe,
      availableLearningTime,
    });

    // Create or update roadmap in database
    const roadmap = await createOrUpdateRoadmap({
      userId: session.user.id,
      currentSkills: userSkills,
      targetRole: profile.careerTrack,
      timeframe,
      availableLearningTime,
      roadmapData,
    });

    return successResponse(
      { roadmap: formatRoadmapResponse(roadmap) },
      "Roadmap generated successfully"
    );
  } catch (err: any) {
    console.error("Roadmap Generation Error:", err);
    const status = err.status || 500;
    const message = err.message || "Failed to generate roadmap";
    return errorResponse(message, status);
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return errorResponse("Unauthorized", 401);
    }

    await connectDB();

    const profile = await validateUserProfile({
      userId: session.user.id,
      shouldCheckSkills: false,
    });

    const roadmap = await fetchUserRoadmap(session.user.id);
    if (!roadmap) {
      return errorResponse("No roadmap found", 404);
    }

    return successResponse({
      roadmap: formatRoadmapResponse(roadmap),
    });
  } catch (err: any) {
    console.error("Fetch Roadmap Error:", err);
    const status = err.status || 500;
    const message = err.message || "Failed to fetch roadmap";
    return errorResponse(message, status);
  }
}
