import { Profile } from "@/database/profile.model";

interface UserValidationInput {
  userId: string;
  shouldCheckSkills?: boolean;
}

export async function validateUserProfile(
  input: UserValidationInput
): Promise<any> {
  const { userId, shouldCheckSkills = true } = input;

  const profile = await Profile.findOne({ userId });
  if (!profile) {
    throw {
      status: 404,
      message: "Profile not found",
    };
  }

  if (shouldCheckSkills) {
    const userSkills = profile.skills || [];
    if (userSkills.length === 0) {
      throw {
        status: 400,
        message: "Please add skills to your profile first",
      };
    }
  }

  return profile;
}
