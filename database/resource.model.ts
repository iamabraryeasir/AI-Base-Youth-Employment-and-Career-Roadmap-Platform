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
  relatedSkill: string;
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
      validate: {
        validator: (value: string) =>
          /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(value),
        message: "Invalid URL format",
      },
    },
    relatedSkill: {
      type: String,
      required: [true, "Related skill is required"],
      trim: true,
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
