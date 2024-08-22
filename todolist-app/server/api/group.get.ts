import { Group } from "../models/Group";

export default defineEventHandler(async (event) => {
  try {
    const groups = await Group.aggregate([
      {
        $lookup: {
          from: "todos",
          localField: "todos",
          foreignField: "_id",
          as: "todos",
        },
      },
    ]);
    event.node.res.statusCode = 200;
    return {
      statusMessage: "success",
      data: groups,
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
