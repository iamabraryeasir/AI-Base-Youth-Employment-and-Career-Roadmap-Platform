import { Schema, model, models, Document } from "mongoose";

/**
 * TypeScript interface for Profile documents
 */
export interface IProfile extends Document {
  userId: Schema.Types.ObjectId;
  fullName: string;
  education: string;
  experienceLevel: ExperienceLevel;
  careerTrack: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ExperienceLevel {
  Fresher = "Fresher",
  Mid = "Mid",
  Experienced = "Experienced",
}

/**
 * Mongoose schema definition for Profile collection
 */
const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    education: {
      type: String,
      trim: true,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, "Experience level is required"],
    },
    careerTrack: {
      type: String,
      required: [true, "Career track is required"],
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (skills: string[]) => Array.isArray(skills),
        message: "Skills must be an array of strings",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Avoid model overwrite in Next.js dev mode (hot reload)
 */
export const Profile =
  models.Profile || model<IProfile>("Profile", ProfileSchema);
