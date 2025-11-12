"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Profile } from "@/database/profile.model";

/**
 * Signup server action
 * 1. Creates user via Better Auth
 * 2. Creates Profile document in MongoDB
 */
export async function signupHandler(formData: FormData) {
  try {
    // Extract data from form
    const fullName = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const education = formData.get("education-level") as string;
    const experienceLevel = formData.get("experience-level") as
      | "Fresher"
      | "Junior"
      | "Mid";
    const careerTrack =
      (formData.get("career-track") as string) ||
      (formData.get("other-career") as string);

    if (!fullName || !email || !password) {
      throw new Error("All required fields must be filled");
    }

    // 1️⃣ Create Better Auth user
    const { user } = await auth.api.signUpEmail({
      body: {
        name: fullName,
        email,
        password,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      },
    });

    if (!user) throw new Error("User creation failed");

    // 2️⃣ Connect to DB
    await connectDB();

    // 3️⃣ Create profile document
    await Profile.create({
      userId: user.id,
      fullName,
      education,
      experienceLevel,
      careerTrack,
      skills: [],
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : new Error(String(err)).message,
    };
  }
}
