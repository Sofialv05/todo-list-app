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
  <div class="h-screen w-screen overflow-hidden">
    <div><h1>Add Task</h1></div>
    <div class="mx-auto h-full w-full rounded-xl bg-gray-400 p-20">
      <Task />
    </div>
  </div>
</template>
