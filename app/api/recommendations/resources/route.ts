import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { Resource } from "@/database/resource.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

interface SkillGapAnalysis {
  userSkills: string[];
  targetRole: string;
  missingSkills: string[];
}

async function analyzeSkillGaps(
  userSkills: string[],
  careerTrack: string,
  experienceLevel: string
): Promise<SkillGapAnalysis> {
  try {
    const prompt = `You are an expert career counselor. Analyze the skill gaps for a professional targeting the "${careerTrack}" role.

User Profile:
- Current Skills: ${userSkills.join(", ")}
- Target Role: ${careerTrack}
- Experience Level: ${experienceLevel}

TASK: Identify EXACTLY 5-6 most critical missing skills for career advancement in "${careerTrack}".

Rules:
1. Only return 5-6 skills maximum (not more, not less if possible)
2. Prioritize skills that are:
   - Most in-demand for the target role
   - Complementary to existing skills
   - High-impact for career growth
3. Avoid skills the user already has
4. Be specific (e.g., "Python" not "Programming")
5. Focus on practical, learnable skills

Return ONLY this JSON with no additional text:
{
  "missingSkills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"]
}`;

    const response = await aiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in career development and skill gap analysis. Provide JSON responses only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_completion_tokens: 500,
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

    let analysis: SkillGapAnalysis = {
      userSkills,
      targetRole: careerTrack,
      missingSkills: [],
    };

    try {
      const parsed = JSON.parse(jsonString);
      analysis.missingSkills = Array.isArray(parsed.missingSkills)
        ? parsed.missingSkills.filter((s: any) => typeof s === "string")
        : [];
    } catch (parseErr) {
      console.error("Failed to parse skill gap analysis JSON:", parseErr);
    }

    return analysis;
  } catch (error) {
    console.error("Error analyzing skill gaps:", error);
    return {
      userSkills,
      targetRole: careerTrack,
      missingSkills: [],
    };
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

    const profile = await Profile.findOne({ userId: session.user.id });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    const userSkills = profile.skills || [];

    // Check if user has any skills
    if (userSkills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You must add skills to your profile to get resource recommendations",
        },
        { status: 400 }
      );
    }

    // Analyze skill gaps for target role
    const skillGapAnalysis = await analyzeSkillGaps(
      userSkills,
      profile.careerTrack,
      profile.experienceLevel
    );

    const missingSkills = skillGapAnalysis.missingSkills;

    // If no missing skills identified, return all resources for current skills
    if (missingSkills.length === 0) {
      return NextResponse.json(
        {
          success: true,
          skillGaps: {
            userSkills,
            targetRole: profile.careerTrack,
            missingSkills: [],
          },
          resources: [],
          message: "Great! Your skills align well with your target role.",
        },
        { status: 200 }
      );
    }

    const allResources = await Resource.find();

    // Find resources that match missing skills
    const resourcesForMissingSkills = allResources
      .map((resource) => {
        // Check which missing skills this resource covers
        const coversMissingSkills = resource.relatedSkills.filter(
          (skill: string) =>
            missingSkills.some(
              (mSkill) =>
                mSkill.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(mSkill.toLowerCase())
            )
        );

        if (coversMissingSkills.length === 0) {
          return null;
        }

        return {
          ...resource.toObject(),
          coversMissingSkills,
          relevanceScore: coversMissingSkills.length,
        };
      })
      .filter((r) => r !== null)
      .sort((a, b) => (b?.relevanceScore || 0) - (a?.relevanceScore || 0));

    return NextResponse.json({
      success: true,
      skillGaps: {
        userSkills,
        targetRole: profile.careerTrack,
        experienceLevel: profile.experienceLevel,
        missingSkills,
      },
      resources: resourcesForMissingSkills,
      totalMissingSkills: missingSkills.length,
      totalRecommendedResources: resourcesForMissingSkills.length,
    });
  } catch (err) {
    console.error("Resource Recommendation Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
