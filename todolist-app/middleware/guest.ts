import { defineNuxtRouteMiddleware, useCookie, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;

  if (token) {
    return navigateTo("/add-task");
  }
});
