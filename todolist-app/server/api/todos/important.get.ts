import { Todo } from "~/server/models/Todo";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const show = query.show as "upcoming" | "passed";

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dateFilter: any = {};

    if (show === "upcoming") {
      dateFilter = { $gte: today };
    } else if (show === "passed") {
      dateFilter = { $lt: today };
    }

    const todos = await Todo.find({
      priority: { $in: ["low", "medium", "high"] },
      dueDate: dateFilter,
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
