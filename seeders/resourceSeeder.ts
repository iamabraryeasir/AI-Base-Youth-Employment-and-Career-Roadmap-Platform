import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "@/lib/others/db";
import { Resource } from "@/database/resource.model";

const resourceData = [
  {
    title: "React Crash Course 2025",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=example1",
    relatedSkills: ["React", "Hooks", "JavaScript"],
    cost: "Free",
    description: "A complete crash course on modern React for beginners.",
  },
  {
    title: "TypeScript for JavaScript Developers",
    platform: "Udemy",
    url: "https://udemy.com/course/typescript-dev-guide",
    relatedSkills: ["TypeScript", "JavaScript"],
    cost: "Paid",
    description: "Learn how to add strong typing to your JS projects.",
  },
  {
    title: "Next.js 16 App Router Guide",
    platform: "Vercel Docs",
    url: "https://nextjs.org/docs",
    relatedSkills: ["Next.js", "React", "SSR"],
    cost: "Free",
    description:
      "Official documentation for building fullstack apps with Next.js.",
  },
  {
    title: "MongoDB Basics",
    platform: "MongoDB University",
    url: "https://university.mongodb.com",
    relatedSkills: ["MongoDB", "NoSQL", "Database Design"],
    cost: "Free",
    description: "Learn to model, query, and scale MongoDB databases.",
  },
  {
    title: "Designing for Accessibility",
    platform: "Coursera",
    url: "https://coursera.org/course/a11y",
    relatedSkills: ["UI/UX Design", "Accessibility", "User Research"],
    cost: "Free",
    description: "Make digital experiences inclusive and accessible.",
  },
  {
    title: "Mastering Node.js APIs",
    platform: "Pluralsight",
    url: "https://pluralsight.com/courses/nodejs-api-design",
    relatedSkills: ["Node.js", "Express.js", "REST API"],
    cost: "Paid",
    description:
      "Learn to design RESTful APIs with Node.js and Express like a pro.",
  },
  {
    title: "Python for Data Analysis",
    platform: "Kaggle Learn",
    url: "https://kaggle.com/learn/pandas",
    relatedSkills: ["Python", "Pandas", "Data Analysis"],
    cost: "Free",
    description: "Practical hands-on course for learning Python data analysis.",
  },
  {
    title: "Figma Essentials for Developers",
    platform: "Skillshare",
    url: "https://skillshare.com/classes/figma-ui-basics",
    relatedSkills: ["Figma", "UI/UX Design", "Prototyping"],
    cost: "Paid",
    description:
      "Understand how to design and collaborate in Figma effectively.",
  },
  {
    title: "AI for Everyone",
    platform: "Coursera",
    url: "https://coursera.org/learn/ai-for-everyone",
    relatedSkills: ["AI", "Machine Learning", "Data Science"],
    cost: "Free",
    description:
      "A beginner-friendly course to understand the basics of AI applications.",
  },
  {
    title: "Advanced Git and GitHub",
    platform: "LinkedIn Learning",
    url: "https://linkedin.com/learning/advanced-git",
    relatedSkills: ["Git", "GitHub", "Version Control"],
    cost: "Paid",
    description:
      "Take your version control workflow to the next level with Git best practices.",
  },
  {
    title: "Modern CSS with Tailwind",
    platform: "Scrimba",
    url: "https://scrimba.com/learn/tailwind",
    relatedSkills: ["Tailwind CSS", "CSS3", "Responsive Design"],
    cost: "Free",
    description: "Learn to style modern web apps quickly using Tailwind CSS.",
  },
  {
    title: "Building REST APIs with Express.js",
    platform: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/learn-expressjs/",
    relatedSkills: ["Express.js", "Node.js", "Backend"],
    cost: "Free",
    description: "Free hands-on guide to building REST APIs using Express.js.",
  },
  {
    title: "Data Visualization with D3.js",
    platform: "Udemy",
    url: "https://udemy.com/course/d3js-data-visualization/",
    relatedSkills: ["D3.js", "Data Visualization", "JavaScript"],
    cost: "Paid",
    description:
      "Create powerful visualizations and interactive dashboards with D3.js.",
  },
  {
    title: "Project Management Basics",
    platform: "Coursera",
    url: "https://coursera.org/learn/project-management",
    relatedSkills: ["Project Management", "Leadership", "Agile"],
    cost: "Free",
    description:
      "Learn the fundamentals of managing projects effectively and efficiently.",
  },
  {
    title: "Intro to Cloud Computing",
    platform: "IBM SkillsBuild",
    url: "https://skillsbuild.org/cloud-computing",
    relatedSkills: ["Cloud Computing", "AWS", "DevOps"],
    cost: "Free",
    description:
      "Discover the foundations of cloud technologies and platforms.",
  },
  {
    title: "JavaScript ES2025 Features",
    platform: "Frontend Masters",
    url: "https://frontendmasters.com/courses/js-new-features/",
    relatedSkills: ["JavaScript", "ESNext", "Programming"],
    cost: "Paid",
    description:
      "Master the latest JavaScript features with practical real-world examples.",
  },
  {
    title: "Data Science Foundations",
    platform: "edX",
    url: "https://edx.org/course/data-science-basics",
    relatedSkills: ["Data Science", "Python", "Statistics"],
    cost: "Free",
    description:
      "Start your journey into data science with this foundational course.",
  },
  {
    title: "Responsive Web Design",
    platform: "freeCodeCamp",
    url: "https://freecodecamp.org/learn/responsive-web-design/",
    relatedSkills: ["HTML", "CSS", "Responsive Design"],
    cost: "Free",
    description:
      "Learn to build responsive, mobile-first websites using HTML5 and CSS3.",
  },
  {
    title: "Mastering Communication Skills",
    platform: "LinkedIn Learning",
    url: "https://linkedin.com/learning/communication-skills",
    relatedSkills: ["Soft Skills", "Communication", "Teamwork"],
    cost: "Paid",
    description:
      "Improve your professional communication, teamwork, and leadership abilities.",
  },
  {
    title: "Digital Marketing Fundamentals",
    platform: "Google Digital Garage",
    url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
    relatedSkills: ["Digital Marketing", "SEO", "Content Strategy"],
    cost: "Free",
    description:
      "Free certification course on SEO, content marketing, and analytics.",
  },
];

export const seedResources = async () => {
  try {
    await connectDB();

    await Resource.deleteMany(); // Clear old data
    await Resource.insertMany(resourceData);

    console.log("✅ Resource data seeded successfully!");
  } catch (error) {
    console.error("❌ Resource seeding failed:", error);
  } finally {
    process.exit(0);
  }
};

seedResources();
