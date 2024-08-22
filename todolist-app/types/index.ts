import type { Types } from "mongoose";

interface Base {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodo extends Base {
  content: string;
  dueDate: Date;
  priority: number;
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
