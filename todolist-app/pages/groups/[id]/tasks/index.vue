<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "@/stores/group";
import { useTodosStore } from "@/stores/todos";

const todoStore = useTodosStore();
const groupStore = useGroupStore();
const route = useRoute();
const groupId = route.params.id as string;

const groupTodos = ref([]);
const filteredTodos = ref([]);

const { pending, error, refresh, data } = await useAsyncData("todos", () =>
  todoStore.getTodos(),
);

const mountedFn = async () => {
  await groupStore.getGroupTodos(groupId);
  groupTodos.value = groupStore.group.todos;
  console.log(groupTodos.value);
  const filterTodos = todoStore.todos.filter((todo) => {
    return !groupTodos.value.some((groupTodo) => groupTodo._id === todo._id);
  });

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
  <div>
    <div
      class="z-1 mx-auto my-14 h-[600px] max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div class="px-4 py-2">
        <h1 class="text-center text-2xl font-bold uppercase text-gray-800">
          Add task to {{ groupStore.group.name }}
        </h1>
        <RouterLink :to="`/groups/${groupId}`" class="btn">
          Back to {{ groupStore.group.name }}</RouterLink
        >
      </div>
      <ul
        class="m-8 max-h-[50vh] divide-y divide-gray-200 overflow-y-auto px-4"
      >
        <div v-if="filteredTodos < 1">
          <h1 class="text-center text-lg text-gray-800">No tasks available</h1>
        </div>
        <li v-else v-for="todo of filteredTodos" :key="todo._id" class="py-4">
          <div class="flex flex-row items-center">
            <Task :todo="todo" :refresh="refresh" />
            <i
              @click="handleAddTodoToGroup(todo._id)"
              class="pi pi-plus-circle ml-4 hover:cursor-pointer"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
