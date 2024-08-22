import { Todo } from "~/server/models/Todo";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    if (!body.name) {
      return {
        statusCode: 400,
        statusMessage: "Todo name is required.",
      };
    }
    await Todo.findByIdAndUpdate(
      { _id: event.context.params!.id },
      {
        name: body.name,
        content: body.content,
        dueDate: new Date(body.dueDate),
        priority: body.priority,
      },
    );
    event.node.res.statusCode = 200;
    return {
      statusMessage: "Success update todo",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
