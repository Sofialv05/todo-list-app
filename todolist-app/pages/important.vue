<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";

const todoStore = useTodosStore();
const showOption = ref("upcoming");

const { pending, error, refresh, data } = await useAsyncData(
  "importantTodos",
  () => todoStore.getImportantTodos(showOption.value),
);

onMounted(async () => {
  await todoStore.getImportantTodos(showOption.value);
});

const handleShowChange = async () => {
  await todoStore.getImportantTodos(showOption.value);
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-center text-2xl font-bold text-sub2">Important Tasks</h1>
  </div>
  <div class="self-center lg:mr-12 lg:self-end">
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
    <ul class="w-full divide-y divide-gray-200 px-4 lg:m-8">
      <div v-if="pending" class="flex h-full w-full">
        <Spinner />
      </div>
      <div v-else-if="error">Error: {{ error.message }}</div>
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
