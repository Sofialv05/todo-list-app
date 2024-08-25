import mongoose from "mongoose";
import { IUser } from "~/types";

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model<IUser>("User", userSchema);
