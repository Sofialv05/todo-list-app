<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
const todoStore = useTodosStore();

const { pending, error, refresh, data } = await useAsyncData(
  "importantTodos",
  () => todoStore.getImportantTodos(),
);
</script>

<template>
  <div
    class="z-1 mx-auto my-14 h-[600px] max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg"
  >
    <div>
      <div class="px-4 py-8">
        <h1 class="text-sub2 text-center text-2xl font-bold">
          Important Tasks
        </h1>
      </div>
      <ul
        class="m-8 max-h-[50vh] divide-y divide-gray-200 overflow-y-auto px-4"
      >
        <div v-if="pending" class="flex h-full w-full">
          <Spinner />
        </div>
        <div v-if="error">Error: {{ error.message }}</div>
        <li
          v-else
          v-for="todo of todoStore.todos"
          :key="todo._id.toString()"
          class="py-4"
        >
          <div class="flex items-center">
            <Task :todo="todo" :refresh="refresh" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
