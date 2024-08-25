<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
<template>
  <main class="font-montserrat relative mx-auto">
    <div class="w-full translate-y-[70%] transform text-[15px] text-black">
      <div class="z-10 mx-auto mt-16 max-w-4xl text-center">
        <h1
          class="text-sub2 mb-6 text-4xl font-extrabold md:text-6xl md:!leading-[75px]"
        >
          My Task App
        </h1>
        <p class="text-gray-500">
          Transform the way you manage your tasks with our powerful todo list
          app. Whether you're planning your day, managing projects, or tracking
          personal goals, our platform offers a seamless, intuitive experience
          to help you stay organized, prioritize effectively, and achieve
          more—effortlessly. Get started today and see how easy it is to stay on
          top of everything that matters.
        </p>
        <div class="mt-10">
          <NuxtLink to="/add-task" class="bg-sub2 btn text-white">
            Get started
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
