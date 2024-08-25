<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
const todoStore = useTodosStore();

const { pending, error, refresh, data } = await useAsyncData(
  "importantTodos",
  () => todoStore.getImportantTodos(),
);
</script>

<template>
  <div class="p-4">
    <h1 class="text-sub2 text-center text-2xl font-bold">Important Tasks</h1>
  </div>

  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="m-8 w-full divide-y divide-gray-200 px-4">
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
</template>
