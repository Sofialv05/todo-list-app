import { Group } from "~/server/models/Group";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params!.id;
  try {
    if (!body.name) {
      return {
        statusCode: 400,
        statusMessage: "Group name is required.",
      };
    }
    await Group.findByIdAndUpdate({ _id: id }, { name });
    event.node.res.statusCode = 200;
    return {
      statusMessage: "Success update group",
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
