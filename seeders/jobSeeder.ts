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
    description:
      "As a Frontend Developer at TechNova, you will be responsible for designing and implementing visually stunning, high-performance user interfaces for our flagship platform. You will collaborate with product managers and designers to create seamless and interactive user experiences, optimizing web pages for maximum speed and scalability. You will also have the opportunity to influence the UI architecture and work with cutting-edge web technologies.",
  },
  {
    title: "Backend Developer",
    company: "Cloudify",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Node.js", "Express.js", "MongoDB"],
    experienceLevel: "Mid",
    description:
      "Join Cloudify as a Backend Developer, where you will be developing robust and scalable backend services. You will be working with Node.js, Express, and MongoDB to build APIs that power high-traffic applications. You will also collaborate closely with the frontend team to integrate user-facing elements and ensure smooth, reliable server-side functionality while maintaining excellent database performance and security protocols.",
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Figma", "Prototyping", "User Research"],
    experienceLevel: "Fresher",
    description:
      "As a UI/UX Designer at DesignHub, you will work closely with our product team to design user-centric web and mobile interfaces. You will conduct user research, build prototypes, and apply user feedback to improve design solutions. You will also participate in design reviews, ensuring the design is aligned with user needs and business goals, while also maintaining a high standard of accessibility and usability.",
  },
  {
    title: "Data Analyst Intern",
    company: "InsightIQ",
    location: "Remote",
    jobType: "Internship",
    requiredSkills: ["Python", "Pandas", "Excel"],
    experienceLevel: "Fresher",
    description:
      "As a Data Analyst Intern, you will have the opportunity to work with real-world data, helping to clean, organize, and analyze datasets using Python, Pandas, and Excel. You will prepare insightful reports that inform business decisions, providing recommendations based on trends and patterns. This internship will give you hands-on experience in data wrangling, analysis, and visualization, allowing you to grow your skills in data-driven problem-solving.",
  },
  {
    title: "Marketing Associate",
    company: "BrandCraft",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["SEO", "Content Writing", "Google Ads"],
    experienceLevel: "Experienced",
    description:
      "As a Marketing Associate at BrandCraft, you will lead our digital marketing campaigns, focusing on SEO, content creation, and PPC advertising using Google Ads. Your role will include performing keyword research, writing engaging content, and optimizing website performance to drive organic traffic. You will collaborate with the analytics team to assess campaign performance, making data-driven recommendations for improving marketing effectiveness and reach.",
  },
  {
    title: "Full Stack Developer",
    company: "NextGen Labs",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React", "Node.js", "MongoDB", "Express.js"],
    experienceLevel: "Mid",
    description:
      "Join NextGen Labs as a Full Stack Developer to develop dynamic and responsive web applications using the MERN stack. You will be involved in all phases of development, from designing user interfaces with React to building and optimizing backend services using Node.js and Express. You will also work with MongoDB to create efficient data models and ensure the scalability and security of the application.",
  },
  {
    title: "Data Scientist",
    company: "DataVerse",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Python", "Machine Learning", "Statistics"],
    experienceLevel: "Mid",
    description:
      "As a Data Scientist at DataVerse, you will leverage your expertise in machine learning and statistics to develop predictive models that drive business insights. You will work with large datasets, applying algorithms and statistical methods to extract meaningful patterns. You will also deploy machine learning models and assess their performance, helping DataVerse stay at the forefront of data-driven decision-making in the industry.",
  },
  {
    title: "Mobile App Developer",
    company: "Appify",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React Native", "TypeScript", "API Integration"],
    experienceLevel: "Experienced",
    description:
      "As a Mobile App Developer at Appify, you will create high-quality cross-platform mobile applications using React Native. You will design user-friendly interfaces and integrate APIs to ensure smooth communication between the app and backend services. Your role will also involve optimizing mobile applications for performance, speed, and responsiveness while adhering to the latest mobile app development trends and best practices.",
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["AWS", "Docker", "CI/CD"],
    experienceLevel: "Mid",
    description:
      "As a DevOps Engineer at CloudOps, you will automate deployment pipelines and manage cloud infrastructure to ensure continuous delivery of high-quality software. You will work with AWS, Docker, and CI/CD tools to streamline development and operations processes. You will also monitor system performance, troubleshoot issues, and implement security measures to safeguard infrastructure and ensure uptime.",
  },
  {
    title: "Digital Marketing Manager",
    company: "Growthify",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Digital Marketing", "Analytics", "SEO"],
    experienceLevel: "Mid",
    description:
      "Lead the digital marketing efforts at Growthify, where you will oversee the development and execution of online marketing strategies. You will manage SEO, paid media campaigns, and email marketing to drive user acquisition and engagement. Using analytics tools, you will measure campaign effectiveness and optimize performance. Your role will be essential in ensuring the company’s digital presence grows and aligns with business objectives.",
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Nexus",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Python", "TensorFlow", "Data Science"],
    experienceLevel: "Mid",
    description:
      "As a Machine Learning Engineer at AI Nexus, you will develop machine learning models to address complex business problems. Your tasks will include building data pipelines, training models with TensorFlow, and deploying solutions to production environments. You will collaborate with data scientists to refine models, ensure their accuracy, and optimize performance. This is an excellent opportunity to work on cutting-edge AI solutions in a fast-paced environment.",
  },
  {
    title: "Frontend Intern",
    company: "CodeCraft",
    location: "Dhaka",
    jobType: "Internship",
    requiredSkills: ["HTML", "CSS", "JavaScript"],
    experienceLevel: "Fresher",
    description:
      "As a Frontend Intern at CodeCraft, you will assist in the development of responsive websites and UIs. You will gain hands-on experience with HTML, CSS, and JavaScript, contributing to the design and optimization of user interfaces. This internship will offer you the chance to learn from senior developers, improve your coding skills, and understand industry-standard development practices while contributing to live projects.",
  },
  {
    title: "Cloud Support Engineer",
    company: "SkyTech",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Cloud Computing", "AWS", "Networking"],
    experienceLevel: "Experienced",
    description:
      "As a Cloud Support Engineer at SkyTech, you will provide expert-level cloud infrastructure support to clients using AWS. You will troubleshoot complex issues related to cloud services, manage network configurations, and ensure system uptime. Your role will require a deep understanding of cloud computing principles, as well as strong problem-solving skills to diagnose and resolve issues efficiently.",
  },
  {
    title: "Content Writer",
    company: "StoryFlow",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Content Writing", "SEO", "Copywriting"],
    experienceLevel: "Fresher",
    description:
      "As a Content Writer at StoryFlow, you will create engaging content for blogs, social media posts, and marketing materials. You will be responsible for writing SEO-optimized content that resonates with our target audience. Your writing will play a key role in building the company’s online presence, enhancing brand visibility, and driving customer engagement.",
  },
  {
    title: "UI Engineer",
    company: "DesignPro",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["React", "UI/UX Design", "Tailwind CSS"],
    experienceLevel: "Experienced",
    description:
      "Join DesignPro as a UI Engineer, where you will be implementing sophisticated user interfaces that prioritize usability and performance. You will work closely with the UX team to ensure design consistency, accessibility, and user-centric functionality across all products. Your expertise with React and Tailwind CSS will help optimize our web applications for a seamless user experience.",
  },
  {
    title: "Data Engineer",
    company: "InsightData",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["SQL", "Python", "ETL"],
    experienceLevel: "Mid",
    description:
      "As a Data Engineer at InsightData, you will design and build data pipelines that efficiently handle large datasets. You will work with SQL and Python to extract, transform, and load (ETL) data into our centralized database systems. Your role will be critical in ensuring that data flows seamlessly and is accessible for analytics and reporting purposes.",
  },
  {
    title: "Software QA Tester",
    company: "Testify",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Manual Testing", "Automation", "Bug Reporting"],
    experienceLevel: "Experienced",
    description:
      "As a Software QA Tester at Testify, you will ensure the quality and functionality of web and mobile applications by performing both manual and automated testing. You will create and execute test cases, report bugs, and work closely with the development team to fix issues. Your role will help maintain high-quality software by ensuring thorough testing across all release stages.",
  },
  {
    title: "Project Coordinator",
    company: "AgileWorks",
    location: "Dhaka",
    jobType: "Full-Time",
    requiredSkills: ["Project Management", "Communication", "Agile"],
    experienceLevel: "Experienced",
    description:
      "As a Project Coordinator at AgileWorks, you will support project managers in planning, executing, and closing projects successfully. You will be responsible for maintaining project documentation, communicating project updates to stakeholders, and tracking progress to ensure deadlines and budgets are met. Your organizational and communication skills will be crucial in ensuring the seamless execution of agile projects.",
  },
  {
    title: "Graphic Designer",
    company: "PixelCraft",
    location: "Chattogram",
    jobType: "Part-Time",
    requiredSkills: ["Adobe Photoshop", "Illustrator", "Creative Design"],
    experienceLevel: "Fresher",
    description:
      "As a Graphic Designer at PixelCraft, you will design visual content for digital and print campaigns. You will use tools like Adobe Photoshop and Illustrator to create high-quality graphics that align with brand guidelines. Your work will contribute to marketing materials, social media content, and other creative projects.",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Remote",
    jobType: "Full-Time",
    requiredSkills: ["Cybersecurity", "Networking", "Monitoring Tools"],
    experienceLevel: "Mid",
    description:
      "As a Cybersecurity Analyst at SecureNet, you will monitor networks and systems for security breaches and vulnerabilities. You will implement preventive measures, conduct risk assessments, and investigate incidents to ensure the integrity and safety of company data and infrastructure. Your work will help protect sensitive information and support compliance with industry security standards.",
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
