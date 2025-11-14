import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  userId: string;
  role: "user" | "assistant";
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Chat =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);
