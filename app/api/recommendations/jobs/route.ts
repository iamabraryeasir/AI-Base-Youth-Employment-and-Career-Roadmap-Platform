import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { Job } from "@/database/jobs.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

interface MatchAnalysis {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

async function analyzeJobMatch(
  userSkills: string[],
  userExperienceLevel: string,
  userCareerTrack: string,
  job: any
): Promise<MatchAnalysis> {
  try {
    const prompt = `You are an expert career counselor. Analyze the job match between a candidate and a job position.

Candidate Profile:
- Skills: ${userSkills.join(", ")}
- Experience Level: ${userExperienceLevel}
- Preferred Career Track: ${userCareerTrack}

Job Requirements:
- Title: ${job.title}
- Company: ${job.company}
- Required Skills: ${job.requiredSkills.join(", ")}
- Required Experience Level: ${job.experienceLevel}

Please analyze and return a JSON response with:
1. matchPercentage: A number between 0-100 indicating the overall match percentage
2. matchedSkills: An array of skills the candidate has that match job requirements
3. missingSkills: An array of skills the candidate is missing for this job

Consider:
- Skill overlap (exact and similar skills)
- Experience level compatibility
- Career track alignment

Return ONLY a valid JSON object with no extra text:
{
  "matchPercentage": number,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"]
}`;

    const response = await aiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert job matching algorithm. Analyze candidate-job fit and return JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_completion_tokens: 1024,
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

    let analysis: MatchAnalysis = {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: [],
    };

    try {
      const parsed = JSON.parse(jsonString);
      analysis = {
        matchPercentage: Math.min(
          100,
          Math.max(0, parsed.matchPercentage || 0)
        ),
        matchedSkills: Array.isArray(parsed.matchedSkills)
          ? parsed.matchedSkills
          : [],
        missingSkills: Array.isArray(parsed.missingSkills)
          ? parsed.missingSkills
          : [],
      };
    } catch (parseErr) {
      console.error("Failed to parse match analysis JSON:", parseErr);
    }

    return analysis;
  } catch (error) {
    console.error("Error analyzing job match:", error);
    return {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: [],
    };
  }
}

export async function GET() {
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

    if (!profile.skills || profile.skills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "You must add skills to your profile to get matches",
        },
        { status: 200 }
      );
    }

    const jobs = await Job.find();

    // Analyze each job for match
    const matchedJobsWithAnalysis = await Promise.all(
      jobs.map(async (job) => {
        const analysis = await analyzeJobMatch(
          profile.skills,
          profile.experienceLevel,
          profile.careerTrack,
          job
        );

        return {
          ...job.toObject(),
          matchPercentage: analysis.matchPercentage,
          matchedSkills: analysis.matchedSkills,
          missingSkills: analysis.missingSkills,
          matchText: `${analysis.matchPercentage}% Match`,
          score: analysis.matchPercentage,
        };
      })
    );

    // Sort by match percentage (highest first)
    const sortedJobs = matchedJobsWithAnalysis.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );

    // Filter jobs with at least 30% match
    const recommendedJobs = sortedJobs.filter(
      (job) => job.matchPercentage >= 30
    );

    return NextResponse.json({
      success: true,
      matchedJobs: recommendedJobs,
      totalJobs: jobs.length,
      matchedCount: recommendedJobs.length,
    });
  } catch (err) {
    console.error("Job Recommendations Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
