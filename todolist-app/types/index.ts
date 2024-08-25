import type { Types } from "mongoose";

interface Base {
  _id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodo extends Base {
  content: string;
  dueDate: Date;
  priority: string;
  completed: boolean;
}

export interface IGroup extends Base {
  todos: Types.ObjectId[];
}

export interface Groups extends Base {
  todos: ITodo[];
}

export interface APIResponse {
  statusMessage: string;
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
