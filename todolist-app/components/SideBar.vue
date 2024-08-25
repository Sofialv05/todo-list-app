<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";
import { useRoute } from "vue-router";

const globalStore = useGlobalStore();

const isActiveLink = (routePath: string) => {
  const route = useRoute();
  return route.path === routePath;
};

const lists = [
  {
    id: 1,
    name: "Add Task",
    href: "/add-task",
  },
  {
    id: 2,
    name: "Important",
    href: "/important",
  },
  {
    id: 3,
    name: "Groups",
    href: "/groups",
  },
  {
    id: 4,
    name: "All Tasks",
    href: "/all-tasks",
  },
];
</script>

<template>
  <nav
    :class="{
      display: globalStore.isDisplay,
      hidden: !globalStore.isDisplay,
    }"
    class="font-monsterrat left-0 top-0 z-10 min-h-screen min-w-[250px] transform overflow-auto bg-white px-4 py-6 shadow-lg transition-all duration-500 peer-checked:translate-x-0"
  >
    <div class="ml-4 flex flex-row items-center">
      <h1 class="text-sub2 text-2xl font-bold">My Task App</h1>
    </div>

    <ul class="mt-6">
      <li v-for="list in lists" :key="list.id" class="text-gray-500">
        <NuxtLink
          :to="list.href"
          class="flex items-center rounded-md px-4 py-3 transition-all hover:bg-primary"
          :class="{ 'bg-sub text-white': isActiveLink(list.href) }"
        >
          <span class="font-semibold">{{ list.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
