import { Todo } from "~/server/models/Todo";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, content, dueDate, priority } = body;
  try {
    if (!body.name) {
      return {
        statusCode: 400,
        statusMessage: "Todo name is required.",
      };
    }
    await Todo.findByIdAndUpdate(
      { _id: event.context.params!.id },
      { name, content, dueDate: new Date(dueDate), priority },
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
