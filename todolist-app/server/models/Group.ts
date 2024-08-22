import mongoose from "mongoose";
import { IGroup } from "~/types";

const groupSchema = new mongoose.Schema<IGroup>({
  name: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export const Group = mongoose.model<IGroup>("Group", groupSchema);
