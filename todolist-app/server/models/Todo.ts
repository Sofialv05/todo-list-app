import mongoose from "mongoose";
import { ITodo } from "~/types";

const todoSchema = new mongoose.Schema<ITodo>({
  name: { type: String, required: true },
  content: { type: String, default: "" },
  dueDate: { type: Date, default: new Date() },
  priority: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
