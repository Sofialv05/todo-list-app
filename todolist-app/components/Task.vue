<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";
import { useTodosStore } from "~/stores/todos";
import type { ITodo } from "~/types";
import { defineProps } from "vue";

const props = defineProps<{
  todo: ITodo;
}>();

const isCompleted = ref(props.todo.completed);

const globalStore = useGlobalStore();
const todoStore = useTodosStore();
const toggleCheckbox = async () => {
  await todoStore.changeTodoStatus(props.todo._id);
  isCompleted.value = !isCompleted.value;
};
</script>
<template>
  <div class="flex w-full flex-row items-center justify-between">
    <div
      :class="{ 'line-through': isCompleted }"
      class="flex flex-auto items-center"
    >
      <label class="label cursor-pointer">
        <input
          type="checkbox"
          :checked="todo.completed"
          class="checkbox"
          @change="toggleCheckbox"
        />
      </label>
      <span class="text-lg">{{ todo.name }}</span>
    </div>
    <p class="text-lg">
      {{ todo.dueDate ? globalStore.formatDate(todo.dueDate) : "" }}
    </p>
  </div>
</template>
