<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();
const route = useRoute();
const groupId = route.params.id as string;

const { pending, error, refresh, data } = await useAsyncData("groupTodos", () =>
  groupStore.getGroupTodos(groupId),
);
</script>

<template>
  <div class="p-4">
    <h1 class="text-center text-2xl font-bold uppercase text-gray-800">
      {{ groupStore.group.name }}
    </h1>
    <RouterLink to="/groups/" class="btn"> Back to Groups</RouterLink>
    <RouterLink :to="`/groups/${groupId}/tasks`" class="btn">
      add task</RouterLink
    >
  </div>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="m-8 w-full divide-y divide-gray-200 px-4">
      <div v-if="pending" class="flex h-full w-full">
        <Spinner />
      </div>
      <div v-if="error">Error: {{ error.message }}</div>
      <li
        v-else
        v-for="todo of groupStore.group.todos"
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
