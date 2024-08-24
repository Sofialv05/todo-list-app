import { Types } from "mongoose";
import { Group } from "~/server/models/Group";
import { Groups } from "~/types";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;

  try {
    const groups = await Group.aggregate<Groups>([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
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
    console.log(error);
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
