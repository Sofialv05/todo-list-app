<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import type { ITodo } from "~/types";

const todoStore = useTodosStore();
const importantTodos = ref<ITodo[]>([]);
const showOption = ref("upcoming");

const { pending, error, refresh } = await useAsyncData("importantTodos", () =>
  todoStore.getImportantTodos(showOption.value),
);

onMounted(async () => {
  await todoStore.getImportantTodos(showOption.value);
  importantTodos.value = todoStore.todos;
});

const handleShowChange = async () => {
  await todoStore.getImportantTodos(showOption.value);
  importantTodos.value = todoStore.todos;
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-sub2 text-center text-2xl font-bold">Important Tasks</h1>
  </div>
  <div class="mr-12 self-end">
    <select
      v-model="showOption"
      @change="handleShowChange"
      class="select select-bordered w-40 max-w-xs"
    >
      <option value="upcoming">Upcoming</option>
      <option value="passed">Passed</option>
    </select>
  </div>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="m-8 w-full divide-y divide-gray-200 px-4">
      <div v-if="pending" class="flex h-full w-full">
        <Spinner />
      </div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <li
        v-else
        v-for="todo of importantTodos"
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
