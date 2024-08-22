import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;
  try {
    const todo = await Todo.findById({ _id: id });
    if (!todo) {
      return {
        statusCode: 404,
        statusMessage: "Todo not found.",
      };
    }
    await Todo.findByIdAndUpdate(
      { _id: event.context.params!.id },
      { completed: !todo.completed },
    );
    event.node.res.statusCode = 200;
    return {
      statusMessage: "Success update todo completed status",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
