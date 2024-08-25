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
  <div>
    <div
      class="z-1 mx-auto my-14 h-[600px] max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div class="px-4 py-2">
        <h1 class="text-center text-2xl font-bold uppercase text-gray-800">
          {{ groupStore.group.name }}
        </h1>
        <RouterLink to="/groups/" class="btn"> Back to Groups</RouterLink>
        <RouterLink :to="`/groups/${groupId}/tasks`" class="btn">
          add task</RouterLink
        >
      </div>
      <ul
        class="m-8 max-h-[50vh] divide-y divide-gray-200 overflow-y-auto px-4"
      >
        <li
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
  </div>
</template>
