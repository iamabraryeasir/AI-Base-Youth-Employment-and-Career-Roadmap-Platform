import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await getServerSession();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { aspect } = await request.json();

    // Fetch user profile
    const profile = await Profile.findOne({ userId: session.user.id });
    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    let prompt = "";
    let systemPrompt =
      "You are a professional CV and LinkedIn coach. Provide concise, actionable advice.";

    if (aspect === "summary") {
      systemPrompt =
        "You are a professional CV writer. Write a compelling professional summary that highlights key strengths and career goals.";
      prompt = `Create a professional summary for:
- Name: ${profile.fullName}
- Target Role: ${profile.careerTrack}
- Experience Level: ${profile.experienceLevel}
- Skills: ${profile.extractedSkills?.join(", ") || "Not specified"}
- Education: ${profile.education}

Write 2-3 sentences that are compelling, professional, and highlight relevant expertise. Return only the summary text, no markdown.`;
    } else if (aspect === "bulletPoints") {
      systemPrompt =
        "You are an expert at writing impactful bullet points for CVs and resumes.";
      prompt = `Generate 3-4 strong bullet points for a ${
        profile.careerTrack
      } professional with ${profile.experienceLevel} experience.
Skills: ${profile.extractedSkills?.join(", ") || "General"}
Focus on impact and achievements. Return as numbered list (1. 2. 3. etc), no markdown.`;
    } else if (aspect === "improvements") {
      systemPrompt =
        "You are a career development advisor specializing in LinkedIn and professional presence optimization.";
      prompt = `Generate 3-4 specific recommendations for improving LinkedIn profile and online portfolio for a ${
        profile.careerTrack
      } professional.
Current skills: ${profile.extractedSkills?.join(", ") || "Various"}
Experience level: ${profile.experienceLevel}

Provide actionable tips that are specific and practical. Return as numbered list (1. 2. 3. etc), no markdown.`;
    }

    const response = await aiClient.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_completion_tokens: 512,
      top_p: 1,
      stream: false,
    });

    const anyResp: any = response;
    const content =
      anyResp?.choices?.[0]?.message?.content ||
      anyResp?.choices?.[0]?.text ||
      "";

    if (aspect === "improvements") {
      // Parse numbered list into array
      const tips = content
        .split(/\n/)
        .filter((line: string) => line.trim().match(/^\d+\./))
        .map((line: string) => line.replace(/^\d+\.\s*/, "").trim());

      return Response.json({
        success: true,
        tips: tips.length > 0 ? tips : [content],
      });
    }

    return Response.json({
      success: true,
      content: content.trim(),
    });
  } catch (error) {
    console.error("Error generating CV suggestions:", error);
    return Response.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
