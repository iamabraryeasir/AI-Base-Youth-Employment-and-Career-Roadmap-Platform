import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Profile } from "@/database/profile.model";
import type { IProfile } from "@/database/profile.model";

export async function fetchUserProfile(): Promise<IProfile | null> {
  try {
    // Get authenticated session
    const session = await getServerSession();
    if (!session?.user) {
      return null;
    }

    // Connect to database
    await connectDB();

    // Fetch profile directly from database
    const userProfile = await Profile.findOne({ userId: session.user.id });

    if (!userProfile) {
      return null;
    }

    return userProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
