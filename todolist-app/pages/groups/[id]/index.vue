<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
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
    <NuxtLink
      to="/groups/"
      class="hover:bg-sub y absolute left-4 hidden flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-gray-700 hover:text-white lg:inline"
    >
      <i class="pi pi-angle-left"></i>
      Back to Groups
    </NuxtLink>
    <h1 class="text-sub2 flex-grow text-center text-2xl font-bold">
      {{ groupStore.group.name }}
    </h1>
  </div>
  <div class="flex items-center justify-center lg:mr-8 lg:justify-end">
    <NuxtLink
      :to="`/groups/${groupId}/tasks`"
      class="bg-sub2 text-md flex-shrink-0 rounded px-4 py-2 text-white hover:bg-gray-600"
    >
      Add task <i class="pi pi-plus-circle pl-2"></i
    ></NuxtLink>
  </div>
  <div class="mt-4 flex flex-grow overflow-y-auto">
    <ul class="w-full divide-y divide-gray-200 px-4 lg:m-8">
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
