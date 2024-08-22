import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;

  let options: any = {};

  if (search) {
    options.name = { $regex: search, $options: "i" };
  }

  try {
    const todos = await Todo.find(options);
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
