import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const userId = event.context.userId;
  const query = getQuery(event);
  const search = query.search as string | undefined;
  const today = query.today as string | undefined;
  console.log(userId);
  try {
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized3" });
    }
    let options: any = { userId: userId };

    if (search) {
      options.name = { $regex: search, $options: "i" };
    }
    if (today === "true") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      options.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const todos = await Todo.find(options).sort({ createdAt: -1, _id: -1 });
    event.node.res.statusCode = 200;
    return {
      statusMessage: "success",
      data: todos,
    };
  } catch (error) {
    console.log(error);
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
