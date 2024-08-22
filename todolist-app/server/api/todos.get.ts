import { Todo } from "../models/Todo";

export default defineEventHandler(async (event) => {
  const { query } = event.context;
  const { search, group } = query as {
    search: string;
    group: string;
  };

  let options: any = {};

  if (search) {
    options.name = { $regex: search, $options: "i" };
  }

  if (group) {
    options.group = group;
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
