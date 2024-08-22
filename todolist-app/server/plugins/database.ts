import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(useRuntimeConfig().MONGODB_URI as string, {
      dbName: "To-Do_List",
    });
    console.log("Successfully connected to DB.");
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong.",
    });
  }
});
