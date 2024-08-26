import jwt from "jsonwebtoken";
import { useCookie } from "nuxt/app";

export default defineEventHandler((event) => {
  console.log("Middleware executed");
  const token = getCookie(event, "token");
  console.log(token);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized1" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    console.log(payload);
    event.context.userId = payload.userId;
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized2" });
  }
});
