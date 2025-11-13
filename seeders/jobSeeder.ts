import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "@/lib/others/db";
import { Job } from "@/database/jobs.model";

const jobData = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    experienceLevel: "Experienced",
    description: "Build and maintain web interfaces for our core platform.",
  },
  {
    title: "Backend Developer",
    company: "Cloudify",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Node.js", "Express.js", "MongoDB"],
    experienceLevel: "Mid",
    description: "Develop scalable backend APIs and services.",
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Figma", "Prototyping", "User Research"],
    experienceLevel: "Fresher",
    description: "Work with cross-functional teams to design user interfaces.",
  },
  {
    title: "Data Analyst Intern",
    company: "InsightIQ",
    location: "Remote",
    jobType: "Internship",
    requiredSkills: ["Python", "Pandas", "Excel"],
    experienceLevel: "Fresher",
    description: "Analyze datasets and prepare reports for business insights.",
  },
  {
    title: "Marketing Associate",
    company: "BrandCraft",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["SEO", "Content Writing", "Google Ads"],
    experienceLevel: "Experienced",
    description: "Support digital marketing campaigns and analytics.",
  },
  {
    title: "Full Stack Developer",
    company: "NextGen Labs",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React", "Node.js", "MongoDB", "Express.js"],
    experienceLevel: "Mid",
    description: "Develop full-stack web apps using MERN technologies.",
  },
  {
    title: "Data Scientist",
    company: "DataVerse",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Python", "Machine Learning", "Statistics"],
    experienceLevel: "Mid",
    description: "Build predictive models and analyze datasets for insights.",
  },
  {
    title: "Mobile App Developer",
    company: "Appify",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React Native", "TypeScript", "API Integration"],
    experienceLevel: "Experienced",
    description: "Develop cross-platform mobile apps using React Native.",
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["AWS", "Docker", "CI/CD"],
    experienceLevel: "Mid",
    description:
      "Automate deployment pipelines and manage cloud infrastructure.",
  },
  {
    title: "Digital Marketing Manager",
    company: "Growthify",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Digital Marketing", "Analytics", "SEO"],
    experienceLevel: "Mid",
    description: "Lead marketing strategy and manage ad performance metrics.",
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Nexus",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Python", "TensorFlow", "Data Science"],
    experienceLevel: "Mid",
    description: "Build machine learning pipelines and deploy AI solutions.",
  },
  {
    title: "Frontend Intern",
    company: "CodeCraft",
    location: "Dhaka",
    jobType: "Internship",
    requiredSkills: ["HTML", "CSS", "JavaScript"],
    experienceLevel: "Fresher",
    description: "Assist in developing responsive web pages and UIs.",
  },
  {
    title: "Cloud Support Engineer",
    company: "SkyTech",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Cloud Computing", "AWS", "Networking"],
    experienceLevel: "Experienced",
    description: "Provide cloud support and help maintain system uptime.",
  },
  {
    title: "Content Writer",
    company: "StoryFlow",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Content Writing", "SEO", "Copywriting"],
    experienceLevel: "Fresher",
    description: "Create engaging blog content and marketing copies.",
  },
  {
    title: "UI Engineer",
    company: "DesignPro",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React", "UI/UX Design", "Tailwind CSS"],
    experienceLevel: "Experienced",
    description: "Implement UI components and ensure accessibility compliance.",
  },
  {
    title: "Data Engineer",
    company: "InsightData",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["SQL", "Python", "ETL"],
    experienceLevel: "Mid",
    description: "Design and manage large-scale data pipelines.",
  },
  {
    title: "Software QA Tester",
    company: "Testify",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Manual Testing", "Automation", "Bug Reporting"],
    experienceLevel: "Experienced",
    description: "Test web and mobile applications for quality assurance.",
  },
  {
    title: "Project Coordinator",
    company: "AgileWorks",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Project Management", "Communication", "Agile"],
    experienceLevel: "Experienced",
    description: "Coordinate project deliverables and manage team workflows.",
  },
  {
    title: "Graphic Designer",
    company: "PixelCraft",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Adobe Photoshop", "Illustrator", "Creative Design"],
    experienceLevel: "Fresher",
    description: "Design digital and print materials for campaigns.",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Cybersecurity", "Networking", "Monitoring Tools"],
    experienceLevel: "Mid",
    description: "Identify security threats and implement preventive measures.",
  },
];

export const seedJobs = async () => {
  try {
    await connectDB();

    await Job.deleteMany();
    await Job.insertMany(jobData);

    console.log("✅ Job data seeded successfully!");
  } catch (error) {
    console.error("❌ Job seeding failed:", error);
  } finally {
    process.exit(0);
  }
};

seedJobs();
