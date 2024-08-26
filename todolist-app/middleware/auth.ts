import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  if (token) {
    try {
      const payload = jwt.verify(
        token,
        useRuntimeConfig().JWT_SECRET as string,
      );
      console.log(payload);
      if (payload) {
        // setAuthUser(payload.userId);

        if (to.path === "/auth/login") {
          return navigateTo("/add-task");
        }
        return;
      }
      return;
    } catch (error) {
      return navigateTo("/auth/login");
    }
  } else if (!token) {
    const customPaths = ["/auth/login", "/auth/register", "/"];

    if (!customPaths.includes(to.path)) {
      return;
    }
    navigateTo("/auth/login");
  }
});

function setAuthUser(userId: string) {
  if (process.server) {
    const event = useRequestEvent();
    if (event) {
      event.context.auth = { userId };
    }
  }
}
