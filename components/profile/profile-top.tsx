import { Pen } from "lucide-react";
import Image from "next/image";

export default function ProfileTop({
  careerInterest,
}: {
  careerInterest?: string;
}) {
  return (
    <div className="p-8 flex space-x-6">
      <Image
        src="/images/abrar.jpg"
        alt="Profile picture"
        width={100}
        height={100}
        className="rounded-full border shadow-md"
      />

      <div>
        <h1 className="text-3xl font-bold">Abrar Yeasir</h1>
        <p className="text-muted-foreground mt-1">Full Stack Developer</p>
      </div>

      <div className="ml-4">
        <h2 className="text-3xl font-bold text-blue-500">Career Interests</h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          {careerInterest?.replaceAll("-", " ").toUpperCase()}
          <Pen size={20} />
        </p>
      </div>
    </div>
  );
}
