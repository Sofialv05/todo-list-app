import mongoose from "mongoose";
import { ITodo } from "~/types";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    name: { type: String, required: true },
    content: { type: String, default: "" },
    dueDate: { type: Date, default: Date.now() },
    priority: { type: String, default: "default" },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
