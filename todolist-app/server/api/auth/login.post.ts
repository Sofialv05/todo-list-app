import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body: { email: string; password: string } = await readBody(event);
  const { email, password } = body;
  try {
    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is required",
      });
    }
    if (!password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password is required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email",
      });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid password",
      });
    }

    const access_token = jwt.sign({ userId: user._id }, "secret");

    event.node.res.statusCode = 200;
    return {
      statusMessage: "Login success",
      access_token,
      userId: user._id,
    };
  } catch (error) {
    console.log(error);
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
