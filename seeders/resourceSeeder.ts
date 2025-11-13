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
    description:
      "This comprehensive crash course on React is designed for absolute beginners who want to get started with building modern web applications using React. The course covers all the core concepts of React, including components, JSX, state, and props. You'll also dive into advanced topics like React Hooks and functional components to build dynamic, interactive UIs. By the end of the course, you'll be able to create a simple but powerful React app, gaining the confidence to explore more complex React projects and integrate third-party libraries for enhanced functionality.",
  },
  {
    title: "TypeScript for JavaScript Developers",
    platform: "Udemy",
    url: "https://udemy.com/course/typescript-dev-guide",
    relatedSkills: ["TypeScript", "JavaScript"],
    cost: "Paid",
    description:
      "This course is perfect for developers who already know JavaScript and want to learn TypeScript to add static typing to their projects. TypeScript is quickly becoming the go-to language for large-scale JavaScript applications, offering powerful features such as type checking, interfaces, and advanced object-oriented programming concepts. You'll learn how to set up TypeScript, use its type system effectively, and refactor JavaScript codebases into TypeScript for better maintainability and scalability. Practical examples and hands-on exercises will help you learn how to integrate TypeScript into your JavaScript workflow seamlessly.",
  },
  {
    title: "Next.js 16 App Router Guide",
    platform: "Vercel Docs",
    url: "https://nextjs.org/docs",
    relatedSkills: ["Next.js", "React", "SSR"],
    cost: "Free",
    description:
      "Next.js 16 introduces the App Router, a new feature that allows developers to easily create server-side rendered (SSR) applications with an intuitive routing system. This official documentation provides step-by-step guidance on how to build modern web applications using Next.js, including how to handle dynamic routes, manage server-side rendering, and optimize performance for both static and dynamic pages. Whether you're new to Next.js or an experienced developer, this guide will help you understand how to leverage the power of React combined with SSR to deliver faster and more scalable applications.",
  },
  {
    title: "MongoDB Basics",
    platform: "MongoDB University",
    url: "https://university.mongodb.com",
    relatedSkills: ["MongoDB", "NoSQL", "Database Design"],
    cost: "Free",
    description:
      "MongoDB Basics is an introductory course designed for beginners who are new to NoSQL databases and want to learn how to work with MongoDB. MongoDB is a highly scalable and flexible NoSQL database that is widely used in modern web and mobile applications. In this course, you'll learn the fundamentals of MongoDB, including how to create databases, insert and query documents, and perform basic data manipulation. You'll also explore key concepts such as indexing, aggregation, and data modeling. The course offers practical exercises and real-world examples, making it a great starting point for anyone interested in database design and development.",
  },
  {
    title: "Designing for Accessibility",
    platform: "Coursera",
    url: "https://coursera.org/course/a11y",
    relatedSkills: ["UI/UX Design", "Accessibility", "User Research"],
    cost: "Free",
    description:
      "This course on Designing for Accessibility teaches you how to create digital products that are inclusive and accessible to users with disabilities. With a focus on web and mobile apps, the course covers essential accessibility principles such as color contrast, keyboard navigation, and screen reader compatibility. You'll also learn how to evaluate the accessibility of your designs using tools and techniques, as well as how to implement inclusive design practices into your workflow. By the end of the course, you'll have the skills to create digital experiences that provide equal access to all users, regardless of their abilities.",
  },
  {
    title: "Mastering Node.js APIs",
    platform: "Pluralsight",
    url: "https://pluralsight.com/courses/nodejs-api-design",
    relatedSkills: ["Node.js", "Express.js", "REST API"],
    cost: "Paid",
    description:
      "Mastering Node.js APIs will guide you through the process of designing and building RESTful APIs using Node.js and Express.js. Node.js is known for its ability to handle large-scale applications efficiently, and when combined with Express.js, it offers a streamlined approach to creating APIs that can scale with your application. In this course, you'll explore the core concepts of API design, including routing, middleware, error handling, and data validation. The course also covers how to integrate databases, authenticate users, and deploy APIs to production. By the end of the course, you'll be confident in your ability to build robust and scalable APIs using Node.js.",
  },
  {
    title: "Python for Data Analysis",
    platform: "Kaggle Learn",
    url: "https://kaggle.com/learn/pandas",
    relatedSkills: ["Python", "Pandas", "Data Analysis"],
    cost: "Free",
    description:
      "In this hands-on course, you'll learn how to use Python and the powerful Pandas library to analyze data efficiently. Python is one of the most popular programming languages for data analysis, and Pandas is a key library that makes working with structured data easy and intuitive. You'll explore essential data analysis techniques such as data cleaning, transformation, aggregation, and visualization. Through practical exercises, you'll gain experience analyzing real-world datasets, learning how to manipulate data and extract meaningful insights. By the end of this course, you'll be equipped with the skills to start your journey in data analysis using Python.",
  },
  {
    title: "Figma Essentials for Developers",
    platform: "Skillshare",
    url: "https://skillshare.com/classes/figma-ui-basics",
    relatedSkills: ["Figma", "UI/UX Design", "Prototyping"],
    cost: "Paid",
    description:
      "Figma Essentials for Developers is a course tailored to help developers learn how to effectively use Figma for UI/UX design. Figma is a powerful design tool that allows designers and developers to collaborate seamlessly. In this course, you'll learn how to create designs, build prototypes, and manage design systems in Figma. You'll also learn how to inspect design files, extract assets, and implement designs directly into your codebase. Whether you're working on a personal project or collaborating with a design team, this course will give you the foundational skills you need to work effectively with Figma.",
  },
  {
    title: "AI for Everyone",
    platform: "Coursera",
    url: "https://coursera.org/learn/ai-for-everyone",
    relatedSkills: ["AI", "Machine Learning", "Data Science"],
    cost: "Free",
    description:
      "AI for Everyone is a beginner-friendly course designed to introduce non-technical learners to the world of Artificial Intelligence and its practical applications. The course covers fundamental concepts in AI and machine learning, explaining how AI is transforming industries such as healthcare, finance, and entertainment. You'll learn about the different types of AI, including supervised and unsupervised learning, and understand how AI models are built and deployed. By the end of the course, you'll have a basic understanding of how AI works and how it can be applied to solve real-world problems.",
  },
  {
    title: "Advanced Git and GitHub",
    platform: "LinkedIn Learning",
    url: "https://linkedin.com/learning/advanced-git",
    relatedSkills: ["Git", "GitHub", "Version Control"],
    cost: "Paid",
    description:
      "This advanced Git and GitHub course is aimed at developers who want to take their version control skills to the next level. Git and GitHub are essential tools for managing source code and collaborating with other developers. In this course, you'll learn advanced Git techniques such as rebasing, cherry-picking, and resolving merge conflicts. You'll also dive into best practices for using GitHub, including managing pull requests, issues, and continuous integration workflows. By the end of this course, you'll be able to work with complex version control systems and manage large-scale projects with ease.",
  },
  {
    title: "Modern CSS with Tailwind",
    platform: "Scrimba",
    url: "https://scrimba.com/learn/tailwind",
    relatedSkills: ["Tailwind CSS", "CSS3", "Responsive Design"],
    cost: "Free",
    description:
      "Modern CSS with Tailwind is a hands-on course where you will learn how to use the popular utility-first CSS framework Tailwind CSS to quickly build responsive, customizable web applications. Unlike traditional CSS, Tailwind provides pre-defined classes that allow developers to style elements by applying utility classes directly in HTML. You'll learn how to use Tailwind's classes for layouts, typography, colors, spacing, and responsiveness. By the end of the course, you'll be able to create visually appealing and highly responsive web pages in a fraction of the time it takes with traditional CSS.",
  },
  {
    title: "Building REST APIs with Express.js",
    platform: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/learn-expressjs/",
    relatedSkills: ["Express.js", "Node.js", "Backend"],
    cost: "Free",
    description:
      "This freeCodeCamp guide walks you through the process of building RESTful APIs using Express.js, a fast, unopinionated, and minimalist web framework for Node.js. You'll learn how to handle routing, middleware, error handling, and create endpoints to interact with your database. This tutorial also introduces you to essential concepts such as authentication, authorization, and validation, which are critical for developing secure APIs. By the end of the guide, you'll have a solid understanding of how to build and deploy REST APIs with Express.js that are both scalable and easy to maintain.",
  },
  {
    title: "Data Visualization with D3.js",
    platform: "Udemy",
    url: "https://udemy.com/course/d3js-data-visualization/",
    relatedSkills: ["D3.js", "Data Visualization", "JavaScript"],
    cost: "Paid",
    description:
      "In this course, you'll master the art of creating interactive data visualizations with D3.js, one of the most powerful libraries for data visualization on the web. You'll start with the basics of D3.js, learning how to bind data to DOM elements, create scales, axes, and how to represent data with SVG. As you progress, you'll explore advanced techniques like animation, transitions, and integrating D3 with real-time data. The course also covers how to work with JSON and CSV files, giving you the tools to visualize complex datasets. By the end of the course, you'll be able to create sophisticated, interactive data visualizations for the web.",
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
