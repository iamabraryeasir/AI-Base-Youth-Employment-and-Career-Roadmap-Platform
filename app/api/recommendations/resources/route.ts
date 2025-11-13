import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import { Resource } from "@/database/resource.model";

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

    const resources = await Resource.find();

    const matchedResources = resources
      .map((resource) => {
        const matched = resource.relatedSkills.filter((skill: string) =>
          userSkills.includes(skill)
        );

        return {
          ...resource.toObject(),
          score: matched.length,
        };
      })
      .filter((resource) => resource.score > 0)
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      resources: matchedResources.slice(0, 10),
    });
  } catch (err) {
    console.error("Resource Recommendation Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
