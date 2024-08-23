<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
const todos = useTodosStore();

const newTodo = ref("");
const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todos.getTodos(),
);

const addTodo = async () => {
  if (newTodo.value.trim()) {
    try {
      await todos.addTodo(newTodo.value);
      newTodo.value = "";
      await refresh();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div
      class="mx-auto my-14 max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div class="px-4 py-2">
        <h1 class="text-center text-2xl font-bold uppercase text-gray-800">
          To-Do List
        </h1>
      </div>
      <form class="mx-auto w-full max-w-sm px-4 py-2" @submit.prevent="addTodo">
        <div class="flex items-center border-b-2 border-teal-500 py-2">
          <input
            v-model="newTodo"
            class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
            type="text"
            placeholder="Add a task"
          />
          <button
            class="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul
        class="m-8 max-h-[50vh] divide-y divide-gray-200 overflow-y-auto px-4"
      >
        <li v-for="todo of todos.todos" :key="todo.id" class="py-2">
          <div class="flex items-center">
            <Task :todo="todo" :refresh="refresh" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
