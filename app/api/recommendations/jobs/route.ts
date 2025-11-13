import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { Job } from "@/database/jobs.model";

function normalize(skill: string) {
  return skill
    .toLowerCase()
    .trim()
    .replace(/[\.\-\/]/g, "") // remove dot, dash, slash
    .replace(/\s+/g, " ") // collapse spaces
    .replace(/\s/g, ""); // remove spaces ("node js" -> "nodejs")
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

    // Normalize user skills
    const userSkills = profile.skills.map(normalize);

    const matchedJobs = jobs
      .map((job) => {
        // Normalize job required skills
        const jobSkills = job.requiredSkills.map(normalize);

        const matchedSkills = jobSkills.filter((s: string) =>
          userSkills.includes(s)
        );

        const score = matchedSkills.length;

        return {
          ...job.toObject(),
          matchedSkills,
          score,
          matchText: `${matchedSkills.length} matched out of ${jobSkills.length} required skills`,
        };
      })
      // ❗ Only jobs with at least 1 matched skill
      .filter((job) => job.score > 0)
      // sort descending by match score
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      matchedJobs,
      topMatches: matchedJobs.slice(0, 9),
    });
  } catch (err) {
    console.error("Matching error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
