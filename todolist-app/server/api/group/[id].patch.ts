import { Types } from "mongoose";
import { Group } from "~/server/models/Group";

export default defineEventHandler(async (event) => {
  const body: { id: Types.ObjectId } = await readBody(event);
  const groupId = event.context.params!.id;
  try {
    if (!groupId) {
      return {
        statusCode: 400,
        statusMessage: "Group id is required.",
      };
    }
    if (!body.id) {
      return {
        statusCode: 400,
        statusMessage: "Todo id is required.",
      };
    }

    const group = await Group.findById({ _id: groupId });

    if (!group) {
      return {
        statusCode: 404,
        statusMessage: "Group not found.",
      };
    }

    if (group.todos.includes(body.id)) {
      return {
        statusCode: 400,
        statusMessage: "Todo already exists in the group",
      };
    }
    await Group.findByIdAndUpdate(
      { _id: groupId },
      { $push: { todos: body.id } },
    );
    event.node.res.statusCode = 200;
    return {
      statusMessage: "Success add new todo to the group",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
