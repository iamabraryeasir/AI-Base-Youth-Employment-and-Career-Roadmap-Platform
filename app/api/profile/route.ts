import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Fetch profile by userId
    const profile = await Profile.findOne({ userId: session.user.id });

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    // Return complete profile data
    return NextResponse.json({
      success: true,
      profile: {
        _id: profile._id,
        userId: profile.userId,
        fullName: profile.fullName,
        education: profile.education,
        experienceLevel: profile.experienceLevel,
        careerTrack: profile.careerTrack,
        skills: profile.skills || [],
        experienceAndProjectOverview:
          profile.experienceAndProjectOverview || "",
        CVText: profile.CVText || "",
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
