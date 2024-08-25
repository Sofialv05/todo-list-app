<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodosStore } from "@/stores/todos";
import type { ITodo } from "~/types";

const todoStore = useTodosStore();

const allTodos = ref<ITodo[]>([]);
const searchRef = ref("");

const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todoStore.getTodos(),
);
onMounted(() => {
  todoStore.getTodos();
  allTodos.value = todoStore.todos;
});

const handleSearch = async () => {
  await todoStore.getTodos(false, searchRef.value);
  allTodos.value = todoStore.todos;
  console.log(allTodos.value);
};
</script>
<template>
  <div class="p-4">
    <h1 class="text-sub2 text-center text-2xl font-bold">All Task</h1>
  </div>
  <form
    class="mx-40 mt-4 flex flex-row items-center justify-center"
    @submit.prevent="handleSearch"
  >
    <div class="mr-3 w-full">
      <input
        type="search"
        v-model="searchRef"
        id="simple-search"
        class="input input-bordered w-full"
        placeholder="Search task name"
      />
    </div>
    <button type="submit" class="btn btn-md">
      <svg
        class="h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <span class="sr-only">Search</span>
    </button>
  </form>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="m-8 w-full divide-y divide-gray-200 px-4">
      <div v-if="pending" class="flex h-full w-full">
        <Spinner />
      </div>
      <div v-if="error">Error: {{ error.message }}</div>
      <li
        v-else
        v-for="todo of allTodos"
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
