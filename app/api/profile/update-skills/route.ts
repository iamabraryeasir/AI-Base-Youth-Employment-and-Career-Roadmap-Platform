import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";

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
    const { skills } = await request.json();

    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { success: false, message: "Skills must be an array" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Update profile skills
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      { skills },
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skills updated successfully",
      skills: updatedProfile.skills,
    });
  } catch (err) {
    console.error("Update Skills Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
