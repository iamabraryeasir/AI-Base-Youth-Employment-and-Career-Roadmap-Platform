import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";

async function extractSkillsFromCV(userId: string) {
  try {
    // Ensure database connection in case this runs independently
    await connectDB();
    const profile = await Profile.findOne({ userId });
    if (!profile?.CVText) {
      console.log("No CV text found for skill extraction");
      return;
    }

    const prompt = `You are an AI that extracts structured information from CV text.
    
    ### Task:
    Extract the following fields from the given CV text:
    - skills → programming languages, frameworks, technical skills
    - tools → software tools, platforms, cloud services, DevOps tools
    - relevantRoles → possible job roles the candidate is suitable for

    ### Output Format (STRICT JSON):
    {
      "skills": [],
      "tools": [],
      "relevantRoles": []
    }

    ### Rules:
    - Return ONLY the JSON object. No explanation or extra text.
    - All items must be strings.
    - No duplicates.
    - If something is not found, return an empty array.
    - Be concise but accurate.
    - Use case-insensitive matching.

    ### Example:
    CV Text: "I am a software engineer with experience in JavaScript, Python, and cloud computing. I have used Git, Docker, and Kubernetes."
    Output:
    {
      "skills": ["JavaScript", "Python", "cloud computing"],
      "tools": ["Git", "Docker", "Kubernetes"],
      "relevantRoles": ["Frontend Developer", "Backend Developer", "DevOps Engineer"]
    }

    ### Now extract from this CV:
    "${profile.CVText}"

    ### FINAL ANSWER (STRICT JSON ONLY):
    `;

    // Dynamically import aiClient to avoid initialization issues
    const { aiClient } = await import("@/lib/ai/open-ai-groq");

    const cvExtractResponce = await aiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert career counselor skilled in extracting relevant skills from CVs.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      stop: null,
    });

    // Extract the content and parse skills
    const anyResp: any = cvExtractResponce;
    const rawContent =
      anyResp?.choices?.[0]?.message?.content ||
      anyResp?.choices?.[0]?.text ||
      "";

    // Try to isolate JSON object inside the model output (in case model adds extra text)
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    const jsonString =
      start !== -1 && end !== -1
        ? rawContent.slice(start, end + 1)
        : rawContent;

    let parsed: any = null;
    try {
      parsed = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse AI JSON output:", err, "raw:", rawContent);
      return null;
    }

    // Normalize arrays
    const skills = Array.isArray(parsed?.skills) ? parsed.skills : [];
    const tools = Array.isArray(parsed?.tools) ? parsed.tools : [];
    const relevantRoles = Array.isArray(parsed?.relevantRoles)
      ? parsed.relevantRoles
      : [];

    // Save to profile document: update both extracted* fields and the main skills field
    await Profile.findByIdAndUpdate(
      profile._id,
      {
        skills: skills,
        extractedSkills: skills,
        extractedTools: tools,
        extractedRelevantRoled: relevantRoles,
      },
      { new: true }
    );

    return {
      extractedSkills: skills,
      extractedTools: tools,
      extractedRelevantRoled: relevantRoles,
    };
  } catch (error) {
    console.error("Error extracting skills:", error);
    // Continue without failing the CV update
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const { CVText } = await request.json();

    // Connect to database
    await connectDB();

    // Update profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      { CVText },
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    // Trigger skill extraction and return extracted values
    let extracted: any = null;
    try {
      extracted = await extractSkillsFromCV(session.user.id);
    } catch (err) {
      console.error("Error extracting skills after update:", err);
    }

    return NextResponse.json({
      success: true,
      message: "CV and additional info updated successfully",
      CVText: updatedProfile.CVText,
      extracted: extracted || {
        extractedSkills: [],
        extractedTools: [],
        extractedRelevantRoled: [],
      },
    });
  } catch (err) {
    console.error("Update CV Text Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
