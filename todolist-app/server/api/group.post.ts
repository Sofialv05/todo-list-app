import { Group } from "../models/Group";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    if (!body.name) {
      return {
        statusCode: 400,
        statusMessage: "Group name is required.",
      };
    }

    await Group.create({ name });

    event.node.res.statusCode = 201;
    return {
      statusMessage: "Success create new group",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
