<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
<template>
  <main class="relative mx-auto">
    <div class="w-full translate-y-[70%] transform text-[15px] text-black">
      <div class="z-10 mx-auto mt-16 max-w-4xl text-center">
        <h1 class="mb-6 text-4xl font-extrabold md:text-6xl md:!leading-[75px]">
          Build Landing Pages with Typeform Integration
        </h1>
        <p class="text-base">
          Embark on a gastronomic journey with our curated dishes, delivered
          promptly to your doorstep. Elevate your dining experience today. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div class="mt-10">
          <NuxtLink
            to="/add-task"
            class="rounded-xl bg-cyan-900 px-6 py-3 text-white transition-all hover:bg-cyan-800"
          >
            Get started
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
