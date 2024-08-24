<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodosStore } from "@/stores/todos";

const todoStore = useTodosStore();

const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todoStore.getTodos(),
);
onMounted(() => {
  todoStore.getTodos();
});
</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div
      class="z-1 mx-auto my-14 h-[600px] max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div class="px-4 py-2">
        <h1 class="text-center text-2xl font-bold uppercase text-gray-800">
          All Tasks
        </h1>
      </div>
      <SearchBar />
      <ul
        class="m-8 max-h-[50vh] divide-y divide-gray-200 overflow-y-auto px-4"
      >
        <li v-for="todo of todoStore.todos" :key="todo.id" class="py-4">
          <div class="flex items-center">
            <Task :todo="todo" :refresh="refresh" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
