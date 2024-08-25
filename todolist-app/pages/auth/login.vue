<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div
    class="mx-auto flex max-w-xl translate-y-[30%] flex-col items-center justify-center px-4 py-6 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl"
  >
    <div class="w-[400px] rounded-2xl bg-white p-8 shadow">
      <h2 class="text-sub2 text-center text-2xl font-bold">Sign in</h2>
      <form class="mt-8 space-y-4">
        <div>
          <label class="text-sub2 mb-2 block text-sm">Email</label>
          <div class="relative flex items-center">
            <input
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
              name="password"
              type="password"
              required
              class="outline-sub text-sub2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div class="!mt-8">
          <button
            type="button"
            class="bg-sub w-full rounded-lg px-4 py-3 text-sm tracking-wide text-white hover:bg-primary hover:font-semibold hover:text-gray-500 focus:outline-none"
          >
            Sign in
          </button>
        </div>
        <p class="text-sub2 !mt-8 text-center text-sm">
          Don't have an account?
          <RouterLink
            to="/auth/register"
            class="text-sub ml-1 whitespace-nowrap font-semibold hover:underline"
            >Register here</RouterLink
          >
        </p>
      </form>
    </div>
  </div>
</template>
