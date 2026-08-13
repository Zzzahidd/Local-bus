import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActiveSession extends Document {
  sessionId: string;
  lastSeen: Date;
  createdAt: Date;
}

const ActiveSessionSchema = new Schema<IActiveSession>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastSeen: {
      type: Date,
      required: true,
      default: Date.now,
      index: { expires: 90 }, // TTL index: auto removes document 90 seconds after lastSeen
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

export const ActiveSession: Model<IActiveSession> =
  mongoose.models.ActiveSession ||
  mongoose.model<IActiveSession>("ActiveSession", ActiveSessionSchema, "active_sessions");
