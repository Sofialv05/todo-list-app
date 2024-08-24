import { Todo } from "~/server/models/Todo";

export default defineEventHandler(async (event) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todos = await Todo.find({
      priority: { $in: ["low", "medium", "high"] },
      dueDate: { $gte: today },
    }).sort({ priority: 1, dueDate: 1, _id: -1 });
    event.node.res.statusCode = 200;
    return {
      statusMessage: "success",
      data: todos,
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
