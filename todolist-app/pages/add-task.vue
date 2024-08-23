<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
const todos = useTodosStore();
await callOnce(todos.getTodos);

const newTodo = "";

const addTodo = async () => {
  await todos.addTodo(newTodo);
};
</script>
<template>
  <div class="">
    <div
      class="mx-auto mt-16 max-w-md overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div class="px-4 py-2">
        <h1 class="text-2xl font-bold uppercase text-gray-800">To-Do List</h1>
      </div>
      <form class="mx-auto w-full max-w-sm px-4 py-2">
        <div class="flex items-center border-b-2 border-teal-500 py-2">
          <input
            class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
            type="text"
            placeholder="Add a task"
          />
          <button
            class="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
            type="button"
          >
            Add
          </button>
        </div>
      </form>
      <ul class="divide-y divide-gray-200 px-4">
        <li class="py-4">
          <div class="flex items-center">
            <Task />
          </div>
        </li>
        <li class="py-4">
          <div class="flex items-center">
            <Task />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
