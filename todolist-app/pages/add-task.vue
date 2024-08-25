<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodosStore } from "@/stores/todos";
const todoStore = useTodosStore();

const newTodo = ref("");
const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todoStore.getTodos(true),
);
onMounted(() => {
  todoStore.getTodos(true);
});

// onBeforeMount(() => {
//   todoStore.getTodos();
// });

const addTodo = async () => {
  if (newTodo.value.trim()) {
    try {
      await todoStore.addTodo(newTodo.value);
      newTodo.value = "";
      await refresh();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
  <div class="p-4">
    <h1 class="text-sub2 text-center text-2xl font-bold">Add New Task</h1>
  </div>
  <form class="mx-auto w-full max-w-xl px-4 py-2" @submit.prevent="addTodo">
    <div class="border-sub flex items-center border-b-2 py-2">
      <input
        v-model="newTodo"
        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-500 focus:outline-none"
        type="text"
        placeholder="Add a task"
      />
      <button
        class="hover:border-sub hover:bg-sub flex-shrink-0 rounded border-4 border-primary bg-primary px-4 py-1 text-sm text-gray-400 hover:text-white"
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
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
