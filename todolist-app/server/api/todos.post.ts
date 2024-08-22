import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const body: { name: string } = await readBody(event);
  try {
    if (!body.name) {
      return {
        statusCode: 400,
        statusMessage: "Todo name is required.",
      };
    }
    await Todo.create({ name: body.name });
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
