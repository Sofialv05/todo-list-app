import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const body: { name: string } = await readBody(event);
  try {
    const userId = event.context.userId;

    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    if (!body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Todo name is required.",
      });
    }
    await Todo.create({ name: body.name, userId });
    event.node.res.statusCode = 201;
    return {
      statusMessage: "Success add new todo",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
