import { Schema, model, models, Document } from "mongoose";

export enum ResourceCost {
  Free = "Free",
  Paid = "Paid",
}

/**
 * TypeScript interface for Resource documents
 */
export interface IResource extends Document {
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost: ResourceCost;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema definition for Resources collection
 */
const ResourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Resource URL is required"],
      trim: true,
    },
    relatedSkills: {
      type: [String],
      required: [true, "At least one related skill is required"],
      default: [],
      validate: {
        validator: (skills: string[]) =>
          Array.isArray(skills) && skills.every((s) => typeof s === "string"),
        message: "Related skills must be an array of strings",
      },
    },
    cost: {
      type: String,
      enum: Object.values(ResourceCost),
      required: [true, "Cost type is required"],
    },
    description: {
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
export const Resource =
  models.Resource || model<IResource>("Resource", ResourceSchema);
