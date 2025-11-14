import { Schema, model, models, Document } from "mongoose";

/**
 * TypeScript interface for Roadmap Phase
 */
export interface IRoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string; // e.g., "Week 1-2" or "Month 1"
  description: string;
  topics: string[];
  technologies: string[];
  projects: {
    title: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  }[];
}

/**
 * TypeScript interface for Roadmap documents
 */
export interface IRoadmap extends Document {
  userId: Schema.Types.ObjectId;
  currentSkills: string[];
  targetRole: string;
  timeframe: number; // in months
  availableLearningTime?: string; // e.g., "2-3 hours/day"
  phases: IRoadmapPhase[];
  jobApplicationPhase: number; // which phase to start applying for jobs
  jobApplicationMonth: number; // specific month to start applying
  estimatedCompletionDate: Date;
  regeneratedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema definition for Roadmap collection
 */
const RoadmapPhaseSchema = new Schema<IRoadmapPhase>(
  {
    phaseNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Phase title is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    topics: {
      type: [String],
      required: true,
      default: [],
    },
    technologies: {
      type: [String],
      required: true,
      default: [],
    },
    projects: {
      type: [
        {
          title: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            required: true,
            trim: true,
          },
          difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { _id: false }
);

const RoadmapSchema = new Schema<IRoadmap>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    currentSkills: {
      type: [String],
      required: true,
      default: [],
    },
    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
    },
    timeframe: {
      type: Number,
      required: true,
      min: 1,
      max: 24,
      default: 6,
    },
    availableLearningTime: {
      type: String,
      trim: true,
      required: false,
    },
    phases: {
      type: [RoadmapPhaseSchema],
      required: true,
      default: [],
    },
    jobApplicationPhase: {
      type: Number,
      required: true,
      default: 1,
    },
    jobApplicationMonth: {
      type: Number,
      required: true,
      default: 1,
    },
    estimatedCompletionDate: {
      type: Date,
      required: true,
    },
    regeneratedAt: {
      type: Date,
      required: false,
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
export const Roadmap =
  models.Roadmap || model<IRoadmap>("Roadmap", RoadmapSchema);
