import { defineNuxtRouteMiddleware, useCookie, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  try {
    const token = useCookie("token").value;

    if (!token) {
      return navigateTo("/auth/login");
    }

    return;
  } catch (error) {
    console.error("Invalid token:", error);
    return navigateTo("/auth/login");
  }
});
