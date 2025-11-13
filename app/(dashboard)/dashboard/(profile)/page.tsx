import CvAndAdditionalInfo from "@/components/profile/cv-and-additional-info";
import ExperienceAndProjects from "@/components/profile/experience-and-projects";
import ProfileTop from "@/components/profile/profile-top";
import SkillsAndExpertise from "@/components/profile/skills-and-expertise";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <section className="border rounded-lg">
      <ProfileTop />
      <Separator />
      
      <SkillsAndExpertise />
      <Separator />

      <ExperienceAndProjects />
      <Separator />

      <CvAndAdditionalInfo />
    </section>
  );
}
