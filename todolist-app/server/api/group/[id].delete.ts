import { Group } from "~/server/models/Group";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;
  try {
    await Group.findByIdAndDelete({ _id: id });

    event.node.res.statusCode = 200;
    return { statusMessage: "Group successfully deleted" };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
