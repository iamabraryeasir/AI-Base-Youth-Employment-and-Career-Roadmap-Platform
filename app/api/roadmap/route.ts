import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { Roadmap, IRoadmapPhase } from "@/database/roadmap.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

interface RoadmapGenerationInput {
  currentSkills: string[];
  targetRole: string;
  timeframe: number; // in months
  availableLearningTime?: string;
}

interface GeneratedRoadmap {
  phases: IRoadmapPhase[];
  jobApplicationPhase: number;
  jobApplicationMonth: number;
}

async function generateRoadmapWithAI(
  input: RoadmapGenerationInput
): Promise<GeneratedRoadmap> {
  try {
    const prompt = `You are an expert career development coach. Create a detailed learning roadmap.

PROFILE:
- Current Skills: ${input.currentSkills.join(", ") || "None"}
- Target Role: ${input.targetRole}
- Timeframe: ${input.timeframe} months
- Available Learning Time: ${input.availableLearningTime || "Not specified"}

REQUIREMENTS:
1. Create ${Math.max(3, Math.ceil(input.timeframe / 2))} learning phases
2. Each phase should cover specific topics and technologies
3. Include 2-3 beginner/intermediate projects per phase
4. Suggest when to start applying for jobs/internships (typically at 60-70% completion)
5. Make the roadmap realistic and achievable

RULES:
- Phases should be evenly distributed across the timeframe
- Each phase should include specific topics, technologies, and project ideas
- Projects should progressively increase in difficulty
- Always include at least one capstone/portfolio project
- Determine optimal time to start job applications (usually after 60-70% of skills learned)

Return ONLY valid JSON with this structure:
{
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Phase Title",
      "duration": "Month 1-2",
      "description": "Brief description of what will be learned",
      "topics": ["topic1", "topic2", "topic3"],
      "technologies": ["tech1", "tech2"],
      "projects": [
        {
          "title": "Project Name",
          "description": "What the project builds",
          "difficulty": "Beginner"
        }
      ]
    }
  ],
  "jobApplicationPhase": 2,
  "jobApplicationMonth": 3
}`;

    const response = await aiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a career roadmap AI. Generate detailed, achievable learning paths. Always return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.8,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    const anyResp: any = response;
    const rawContent =
      anyResp?.choices?.[0]?.message?.content ||
      anyResp?.choices?.[0]?.text ||
      "{}";

    // Extract JSON from response
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    const jsonString =
      start !== -1 && end !== -1
        ? rawContent.slice(start, end + 1)
        : rawContent;

    const parsed = JSON.parse(jsonString);

    return {
      phases: parsed.phases || [],
      jobApplicationPhase: parsed.jobApplicationPhase || 2,
      jobApplicationMonth: parsed.jobApplicationMonth || 3,
    };
  } catch (error) {
    console.error("Error generating roadmap with AI:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const profile = await Profile.findOne({ userId: session.user.id });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    const userSkills = profile.skills || [];
    if (userSkills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please add skills to your profile first",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const timeframe = body.timeframe || 6;
    const availableLearningTime = body.availableLearningTime || "";

    // Generate roadmap using AI
    const roadmapData = await generateRoadmapWithAI({
      currentSkills: userSkills,
      targetRole: profile.careerTrack,
      timeframe,
      availableLearningTime,
    });

    // Calculate estimated completion date
    const estimatedCompletionDate = new Date();
    estimatedCompletionDate.setMonth(
      estimatedCompletionDate.getMonth() + timeframe
    );

    // Create or update roadmap
    let roadmap = await Roadmap.findOne({ userId: session.user.id });

    if (roadmap) {
      // Update existing roadmap
      roadmap.currentSkills = userSkills;
      roadmap.targetRole = profile.careerTrack;
      roadmap.timeframe = timeframe;
      roadmap.availableLearningTime = availableLearningTime;
      roadmap.phases = roadmapData.phases;
      roadmap.jobApplicationPhase = roadmapData.jobApplicationPhase;
      roadmap.jobApplicationMonth = roadmapData.jobApplicationMonth;
      roadmap.estimatedCompletionDate = estimatedCompletionDate;
      roadmap.regeneratedAt = new Date();
      await roadmap.save();
    } else {
      // Create new roadmap
      roadmap = new Roadmap({
        userId: session.user.id,
        currentSkills: userSkills,
        targetRole: profile.careerTrack,
        timeframe,
        availableLearningTime,
        phases: roadmapData.phases,
        jobApplicationPhase: roadmapData.jobApplicationPhase,
        jobApplicationMonth: roadmapData.jobApplicationMonth,
        estimatedCompletionDate,
      });
      await roadmap.save();
    }

    // Update profile with roadmap reference
    profile.roadmapId = roadmap._id;
    await profile.save();

    return NextResponse.json({
      success: true,
      message: "Roadmap generated successfully",
      roadmap: {
        _id: roadmap._id,
        phases: roadmap.phases,
        jobApplicationPhase: roadmap.jobApplicationPhase,
        jobApplicationMonth: roadmap.jobApplicationMonth,
        estimatedCompletionDate: roadmap.estimatedCompletionDate,
        timeframe: roadmap.timeframe,
        targetRole: roadmap.targetRole,
      },
    });
  } catch (err) {
    console.error("Roadmap Generation Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const roadmap = await Roadmap.findOne({ userId: session.user.id });
    if (!roadmap) {
      return NextResponse.json(
        { success: false, message: "No roadmap found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      roadmap: {
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
      },
    });
  } catch (err) {
    console.error("Fetch Roadmap Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}
