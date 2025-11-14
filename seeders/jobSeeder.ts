import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "@/lib/others/db";
import { Job } from "@/database/jobs.model";

const jobData = [
  {
    title: "Digital Marketing & Technical Writer",
    company: "Karooth IT (BD) Limited",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: [
      "Digital Marketing",
      "SEO",
      "Technical Writing",
      "Google Ads",
      "Social Media Management",
    ],
    experienceLevel: "Mid",
    description:
      "Karooth IT (BD) Ltd is hiring a Technical Writer & Digital Marketer to manage campaigns, prepare proposals, create marketing content, and support business development for software and biometric solutions.",
    jobPlatform: "LinkedIn",
    applyUrl: "https://www.linkedin.com/jobs/view/4318011324",
  },
  {
    title: "Frontend Software Engineer",
    company: "AI Jobs (Hiring for a Global AI Company)",
    location: "Remote",
    jobType: "Part-Time",
    requiredSkills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Debugging",
      "Testing",
    ],
    experienceLevel: "Experienced",
    description:
      "A global AI company is hiring Frontend Engineers to build coding benchmarks, create testing suites, optimize code, and contribute to AI research. Fully remote with flexible hours.",
    jobPlatform: "LinkedIn",
    applyUrl: "https://www.linkedin.com/jobs/view/4336033265",
  },
  {
    title: "Web/UI Engineer",
    company: "Canonical",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: [
      "React",
      "TypeScript",
      "Flutter",
      "Web Technologies",
      "API Integration",
    ],
    experienceLevel: "Experienced",
    description:
      "Canonical is hiring Web/UI Engineers to develop high-quality interfaces for enterprise products, contribute to open-source design systems, improve performance, and collaborate on engineering reviews.",
    jobPlatform: "LinkedIn",
    applyUrl: "https://www.linkedin.com/jobs/view/4286641997",
  },
  {
    title: "Sales Executive",
    company: "Marvel Land Entertainment Limited",
    location: "Dhanmondi",
    jobType: "Full-Time",
    requiredSkills: [
      "Sales",
      "Customer Communication",
      "Negotiation",
      "Marketing Basics",
      "Target Achievement",
    ],
    experienceLevel: "Mid",
    description:
      "Marvel Land Entertainment Ltd is hiring Sales Executives to manage customer interactions, achieve sales targets, and support business operations. Includes bonuses and overtime allowance.",
    jobPlatform: "Shomvob",
    applyUrl: "https://app.shomvob.co/single-job-description/?id=17790",
  },
  {
    title: "Web Developer (WordPress & Laravel)",
    company: "ZamZam Travels BD",
    location: "Paltan, Mirpur",
    jobType: "Full-Time",
    requiredSkills: ["WordPress", "Laravel", "PHP", "MySQL", "Web Development"],
    experienceLevel: "Mid",
    description:
      "ZamZam Travels BD is seeking a Web Developer skilled in WordPress and Laravel to design, build, and maintain company websites with strong backend and frontend knowledge.",
    jobPlatform: "Shomvob",
    applyUrl: "https://app.shomvob.co/single-job-description/?id=17771",
  },
  {
    title: "Product Designer",
    company: "Not Specified",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: [
      "Product Design",
      "CAD",
      "3D Modeling",
      "Research",
      "Prototyping",
    ],
    experienceLevel: "Experienced",
    description:
      "Hiring a Product Designer to work on concept development, prototypes, CAD modeling, market research, and user testing for various product lines.",
    jobPlatform: "Indeed",
    applyUrl: "https://www.indeed.com/viewjob?jk=9989a782d5168379",
  },
  {
    title: "AI Trainer (Data Labeling & Annotation)",
    company: "Embedding VC",
    location: "Remote",
    jobType: "Internship",
    requiredSkills: [
      "Data Labeling",
      "Annotation",
      "Attention to Detail",
      "English Communication",
      "Taxonomy Understanding",
    ],
    experienceLevel: "Mid",
    description:
      "Embedding VC is hiring AI Trainers to label and review image/video datasets, ensure consistent annotations, and support multimodal AI research. Flexible hours and high pay.",
    jobPlatform: "Indeed",
    applyUrl: "https://www.indeed.com/viewjob?jk=8b5a1ebbc77b6132",
  },
  {
    title: "AI & Machine Learning Subject Matter Expert",
    company: "Orants.ai",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: [
      "Machine Learning",
      "AI Concepts",
      "Python",
      "Analytical Skills",
      "Technical Communication",
    ],
    experienceLevel: "Experienced",
    description:
      "Orants.ai is hiring an AI & ML expert to provide guidance, research trends, support project teams, and contribute to AI-driven solutions with strong analytical and communication skills.",
    jobPlatform: "Indeed",
    applyUrl: "https://www.indeed.com/viewjob?jk=5288bc84d373a8ce",
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
