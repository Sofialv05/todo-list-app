<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

import { ref } from "vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = async () => {
  try {
    const { data } = await useFetch("/api/auth/register", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      },
    });
    navigateTo("/auth/login");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div
    class="mx-auto flex max-w-xl translate-y-[20%] flex-col items-center justify-center px-4 py-6 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl"
  >
    <div class="w-[400px] rounded-2xl bg-white p-8 shadow">
      <h2 class="text-sub2 text-center text-2xl font-bold">Sign up</h2>
      <form class="mt-8 space-y-4" @submit.prevent="handleRegister">
        <div>
          <label class="text-sub2 mb-2 block text-sm">Email</label>
          <div class="relative flex items-center">
            <input
              v-model="email"
              name="email"
              type="text"
              required
              class="outline-sub text-sub2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <label class="text-sub2 mb-2 block text-sm">Password</label>
          <div class="relative flex items-center">
            <input
              v-model="password"
              name="password"
              type="password"
              required
              class="outline-sub text-sub2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div>
          <label class="text-sub2 mb-2 block text-sm">Confirm Password</label>
          <div class="relative flex items-center">
            <input
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="outline-sub text-sub2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div class="!mt-8">
          <button
            type="submit"
            class="bg-sub w-full rounded-lg px-4 py-3 text-sm tracking-wide text-white hover:bg-primary hover:font-semibold hover:text-gray-500 focus:outline-none"
          >
            Sign up
          </button>
        </div>
        <p class="text-sub2 !mt-8 text-center text-sm">
          Already have an account?
          <RouterLink
            to="/auth/login"
            class="text-sub ml-1 whitespace-nowrap font-semibold hover:underline"
            >Login</RouterLink
          >
        </p>
      </form>
    </div>
  </div>
</template>
