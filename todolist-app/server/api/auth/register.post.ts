import bcryptjs from "bcryptjs";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body: { email: string; password: string; confirmPassword: string } =
    await readBody(event);
  const { email, password, confirmPassword } = body;
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

    if (password !== confirmPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password and Confirm Password must be the same",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is already in use",
      });
    }

    const newUser = await User.create({
      email,
      password: bcryptjs.hashSync(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    event.node.res.statusCode = 201;
    return {
      statusMessage: "Success create new user",
    };
  } catch (error) {
    console.log(error);
    event.node.res.statusCode = 500;
    return {
      statusMessage: "Something went wrong.",
    };
  }
});
