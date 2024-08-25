<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();
const route = useRoute();
const groupId = route.params.id as string;

const { pending, error, refresh } = await useAsyncData("groupTodos", () =>
  groupStore.getGroupTodos(groupId),
);
</script>

<template>
  <div class="relative flex flex-row items-center p-4">
    <RouterLink
      to="/groups/"
      class="hover:bg-sub y absolute left-4 flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-gray-700 hover:text-white"
    >
      <i class="pi pi-angle-left"></i>
      Back to Groups
    </RouterLink>
    <h1 class="text-sub2 flex-grow text-center text-2xl font-bold">
      {{ groupStore.group.name }}
    </h1>
  </div>
  <div class="mr-8 flex items-center justify-end">
    <RouterLink
      :to="`/groups/${groupId}/tasks`"
      class="y bg-sub2 text-md flex-shrink-0 rounded px-4 py-2 text-white hover:bg-gray-600"
    >
      Add task <i class="pi pi-plus-circle pl-2"></i
    ></RouterLink>
  </div>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="m-8 w-full divide-y divide-gray-200 px-4">
      <div v-if="pending" class="flex h-full w-full">
        <Spinner />
      </div>
      <div v-else-if="error">Error: {{ error.message }}</div>
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
