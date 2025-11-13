import CvAndAdditionalInfo from "@/components/profile/cv-and-additional-info";
import ExperienceAndProjects from "@/components/profile/experience-and-projects";
import ProfileTop from "@/components/profile/profile-top";
import SkillsAndExpertise from "@/components/profile/skills-and-expertise";
import { Separator } from "@/components/ui/separator";
import { fetchUserProfile } from "@/lib/profile/fetch-user-profile";

export default async function ProfilePage() {
  const userProfile = await fetchUserProfile();

  if (!userProfile) {
    return <div>Profile not found. Please complete your profile setup.</div>;
  }

  return (
    <section className="border rounded-lg">
      <ProfileTop
        careerInterest={userProfile?.careerTrack}
        fullName={userProfile?.fullName}
        profession={userProfile?.education}
      />
      <Separator />

      <SkillsAndExpertise skills={userProfile?.skills} />
      <Separator />

      <ExperienceAndProjects
        experienceAndProjects={userProfile?.experienceAndProjectOverview}
      />
      <Separator />

      <CvAndAdditionalInfo cvAndAdditionalInfo={userProfile?.CVText} />
    </section>
  );
}
