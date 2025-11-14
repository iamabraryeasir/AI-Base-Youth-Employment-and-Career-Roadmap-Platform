import { Schema, model, models, Document } from "mongoose";
import { ExperienceLevel } from "./profile.model";

/**
 * TypeScript interface for Job documents
 */
export interface IJob extends Document {
  title: string;
  company: string;
  location?: string;
  jobType: "Full-Time" | "Part-Time" | "Internship" | "Remote";
  requiredSkills: string[];
  experienceLevel: ExperienceLevel;
  description?: string;
  jobPlatform?: string;
  applyUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema definition for Jobs collection
 */
const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "Remote",
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      required: [true, "Job type is required"],
    },
    requiredSkills: {
      type: [String],
      default: [],
      validate: {
        validator: (skills: string[]) => Array.isArray(skills),
        message: "Required skills must be an array of strings",
      },
    },
    experienceLevel: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, "Experience level is required"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    jobPlatform: {
      type: String,
      trim: true,
      default: "",
    },
    applyUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Prevent model overwrite during hot reload in Next.js
 */
export const Job = models.Job || model<IJob>("Job", JobSchema);
