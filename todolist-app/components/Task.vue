<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";
import { useTodosStore } from "~/stores/todos";
import type { ITodo } from "~/types";
import { defineProps, ref, toRefs } from "vue";

// props
const props = defineProps<{
  todo: ITodo;
}>();

// refs
const isCompleted = ref(props.todo.completed);
const isEditing = ref(false);
const todoRef = ref({
  name: props.todo.name,
  content: props.todo.content,
  dueDate: props.todo.dueDate,
  priority: props.todo.priority,
});

const { name } = ref(todoRef);

// stores
const globalStore = useGlobalStore();
const todoStore = useTodosStore();

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = true;
};

// Toggle completed status
const toggleCheckbox = async () => {
  await todoStore.changeTodoStatus(props.todo._id);
  isCompleted.value = !isCompleted.value;
};

// Handle edit submission
const handleSubmitEdit = async () => {
  await todoStore.updateTodo(todoRef.value, props.todo._id);
  isEditing.value = false;
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
          :checked="isCompleted"
          class="checkbox"
          @change="toggleCheckbox"
        />
      </label>
      <span v-if="!isEditing" @dblclick="toggleEdit" class="text-md">
        {{ todoRef.name }}
      </span>
      <input
        v-else
        type="text"
        class="text-md w-full focus:outline-none"
        v-model="todoRef.name"
        @blur="handleSubmitEdit"
        @keyup.enter="handleSubmitEdit"
      />
    </div>
    <p class="text-md">
      {{ props.todo.dueDate ? globalStore.formatDate(props.todo.dueDate) : "" }}
    </p>
  </div>
</template>
