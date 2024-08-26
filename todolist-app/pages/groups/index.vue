<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref, onMounted } from "vue";
import { useGroupStore } from "@/stores/group";
import type { ITodo } from "~/types";

const groupStore = useGroupStore();

const newGroup = ref("");

const { pending, error, refresh } = await useAsyncData("groups", () =>
  groupStore.getGroups(),
);

const taskProgress = (group: any) => {
  const totalTasks = group.todos.length;
  if (!totalTasks) {
    return { completedTask: "No task yet", progress: "0%" };
  }
  const completedTasks = group.todos.filter(
    (task: ITodo) => task.completed,
  ).length;
  const result = Math.round((completedTasks / totalTasks) * 100) + "%";

  return { completedTask: result, progress: result };
};

const addGroup = async () => {
  if (newGroup.value.trim()) {
    try {
      await groupStore.addGroup(newGroup.value);
      newGroup.value = "";
      await refresh();
    } catch (error) {
      console.error(error);
    }
  }
};

const handleDeleteGrop = async (id: string) => {
  try {
    await groupStore.deleteGroup(id);
    await refresh();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <form class="mx-auto w-full max-w-xl px-4 py-2" @submit.prevent="addGroup">
    <div class="border-sub flex items-center border-b-2 py-2">
      <input
        v-model="newGroup"
        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-500 focus:outline-none"
        type="text"
        placeholder="Create a new group"
      />
      <button
        class="hover:border-sub hover:bg-sub flex-shrink-0 rounded border-4 border-primary bg-primary px-4 py-1 text-sm text-gray-600 hover:text-white"
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
  <div class="mt-4 flex flex-grow flex-col gap-5 overflow-y-auto p-4">
    <div v-if="pending" class="flex h-full w-full">
      <Spinner />
    </div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div
      v-else
      v-for="group of groupStore.groups"
      class="flex items-center justify-center"
    >
      <div class="card w-full border-2 shadow-md">
        <div class="card-body">
          <div class="flex flex-col gap-5">
            <h2 class="card-title text-gray-600">{{ group.name }}</h2>
            <div class="flex flex-col justify-between gap-10 lg:flex-row">
              <div class="lg:w-3/4">
                <ProgressBar :progress="taskProgress(group)" />
              </div>
              <div class="flex flex-wrap items-center gap-2 self-end">
                <NuxtLink
                  :to="`/groups/${group._id}`"
                  class="hover:bg-sub flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-gray-700 hover:text-white"
                >
                  See all tasks
                </NuxtLink>
                <button
                  class="flex-shrink-0 rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 hover:text-white"
                >
                  <i
                    @click="handleDeleteGrop(group._id.toString())"
                    class="pi pi-trash hover:cursor-pointer"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
