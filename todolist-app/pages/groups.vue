<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGroupStore } from "@/stores/group";

const groupStore = useGroupStore();

const newGroup = ref("");

const { pending, error, refresh, data } = await useAsyncData("groups", () =>
  groupStore.getGroups(),
);

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
  <div v-if="pending">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else class="mx-auto flex flex-col">
    <form class="mx-auto w-full max-w-sm px-4 py-2" @submit.prevent="addGroup">
      <div class="flex items-center border-b-2 py-2">
        <input
          v-model="newGroup"
          class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
          type="text"
          placeholder="Create a group"
        />
        <button class="btn" type="submit">Add</button>
      </div>
    </form>
    <div class="m-16 flex flex-col gap-5">
      <div
        v-for="group of groupStore.groups"
        class="flex items-center justify-center"
      >
        <div class="card w-full bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{{ group.name }}</h2>

            <div class="card-actions flex justify-end">
              <button class="btn btn-primary">see all tasks</button>
              <button class="btn btn-error">
                <i
                  @click="handleDeleteGrop(group._id)"
                  class="pi pi-trash hover:cursor-pointer"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
