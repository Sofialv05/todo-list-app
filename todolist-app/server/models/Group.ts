import mongoose from "mongoose";
import { IGroup } from "~/types";

const groupSchema = new mongoose.Schema<IGroup>(
  {
    name: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

export const Group = mongoose.model<IGroup>("Group", groupSchema);
