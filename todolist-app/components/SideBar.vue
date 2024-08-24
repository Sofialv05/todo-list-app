<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

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
    class="left-0 top-0 z-10 min-h-screen min-w-[250px] transform overflow-auto bg-[#fcfcfc] px-4 py-6 font-[sans-serif] shadow-lg transition-all duration-500 peer-checked:translate-x-0"
  >
    <div class="flex flex-row justify-between">
      <a href="javascript:void(0)"
        ><img
          src="https://readymadeui.com/readymadeui.svg"
          alt="logo"
          class="w-[160px]"
        />
      </a>
    </div>

    <ul class="mt-8">
      <li v-for="list in lists" :key="list.id">
        <NuxtLink
          :to="list.href"
          class="flex items-center rounded-md px-4 py-3 text-sm text-gray-600 transition-all hover:bg-[#efefef] hover:text-black"
        >
          <span>{{ list.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
