import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;
  try {
    await Todo.findByIdAndDelete({ _id: id });

    event.node.res.statusCode = 200;
    return { statusMessage: "Todo successfully deleted" };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
