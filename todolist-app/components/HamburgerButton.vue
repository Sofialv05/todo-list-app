<script setup lang="ts">
import { useSideBarStore } from "@/stores/sidebar";

const sideBarStore = useSideBarStore();
function handleToggleSideBar() {
  sideBarStore.toggleSideBar();
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="relative mx-auto py-3 sm:max-w-xl">
      <nav @click.prevent="handleToggleSideBar">
        <button
          class="relative h-10 w-10 bg-white text-gray-500 focus:outline-none"
        >
          <span class="sr-only" />
          <div
            class="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
              :class="{
                'rotate-45': sideBarStore.isDisplay,
                '-translate-y-1.5': !sideBarStore.isDisplay,
              }"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
              :class="{ 'opacity-0': sideBarStore.isDisplay }"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
              :class="{
                '-rotate-45': sideBarStore.isDisplay,
                'translate-y-1.5': !sideBarStore.isDisplay,
              }"
            ></span>
          </div>
        </button>
      </nav>
    </div>
  </div>
</template>

<style>
.navbar-nav {
  display: none;
  list-style: none;
}

.navbar-nav.show {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.navbar-nav li a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
}
</style>
