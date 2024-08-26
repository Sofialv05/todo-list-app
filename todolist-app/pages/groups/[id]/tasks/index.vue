<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "@/stores/group";
import { useTodosStore } from "@/stores/todos";
import type { IGroup, ITodo } from "~/types";

const todoStore = useTodosStore();
const groupStore = useGroupStore();
const route = useRoute();
const groupId = route.params.id as string;

const groupTodos = ref<ITodo[]>([]);
const filteredTodos = ref<ITodo[]>([]);

const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todoStore.getTodos(),
);

const mountedFn = async () => {
  await groupStore.getGroupTodos(groupId);
  groupTodos.value = groupStore.group.todos;
  // console.log(groupTodos.value);
  const filterTodos = todoStore.todos.filter((todo) => {
    return !groupTodos.value.some((groupTodo) => groupTodo._id === todo._id);
  });
  // console.log(filterTodos);

  filteredTodos.value = filterTodos;
};

onMounted(async () => {
  await mountedFn();
});

const handleAddTodoToGroup = async (todoId: string) => {
  await groupStore.addTodoToGroup(todoId, route.params.id as string);
  await mountedFn();
  await refresh();
};
</script>

<template>
  <div class="relative flex flex-row items-center p-4">
    <NuxtLink
      :to="`/groups/${groupId}`"
      class="hover:bg-sub y absolute left-4 hidden flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-gray-700 hover:text-white lg:inline"
    >
      <i class="pi pi-angle-left"></i>
      Back to {{ groupStore.group.name }}
    </NuxtLink>
    <h1 class="text-sub2 flex-grow text-center text-2xl font-bold">
      Add task to {{ groupStore.group.name }}
    </h1>
  </div>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="w-full divide-y divide-gray-200 px-4 lg:m-8">
      <div v-if="filteredTodos.length < 1">
        <h1 class="text-center text-lg text-gray-800">No tasks available</h1>
      </div>
      <li
        v-else
        v-for="todo of filteredTodos"
        :key="todo._id.toString()"
        class="py-4"
      >
        <div class="flex flex-row items-center">
          <Task :todo="todo" :refresh="refresh" />
          <i
            @click="handleAddTodoToGroup(todo._id.toString())"
            class="pi pi-plus-circle ml-4 hover:cursor-pointer"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>
