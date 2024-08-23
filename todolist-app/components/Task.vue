<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";
import { useTodosStore } from "~/stores/todos";
import type { ITodo } from "~/types";
import { ref, toRefs } from "vue";

// props
const props = defineProps<{
  todo: ITodo;
  refresh: () => Promise<void>;
}>();

// refs
const isCompleted = ref(props.todo.completed);
const isEditingName = ref(false);
const isEditingContent = ref(false);
const isEditingDate = ref(false);
const todoRef = ref({
  name: props.todo.name,
  content: props.todo.content,
  dueDate: props.todo.dueDate,
  priority: props.todo.priority,
});

// stores
const globalStore = useGlobalStore();
const todoStore = useTodosStore();

// Toggle edit mode
const toggleEditName = () => {
  isEditingName.value = true;
};
const toggleEditContent = () => {
  isEditingContent.value = true;
};
const toggleEditDate = () => {
  isEditingDate.value = true;
};

// Toggle completed status
const toggleCheckbox = async () => {
  await todoStore.changeTodoStatus(props.todo._id);
  isCompleted.value = !isCompleted.value;
};

// Handle edit submission
const handleSubmitEdit = async () => {
  try {
    const updatedTodo = {
      name: todoRef.value.name,
      content: todoRef.value.content,
      dueDate: todoRef.value.dueDate,
      priority: todoRef.value.priority,
    };

    const response = await todoStore.updateTodo(updatedTodo, props.todo._id);

    isEditingName.value = false;
    isEditingContent.value = false;
    isEditingDate.value = false;

    await props.refresh();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

//handle delete todo
const handleDelete = async () => {
  await todoStore.deleteTodo(props.todo._id);
  await props.refresh();
};
</script>

<template>
  <div class="flex w-full flex-col">
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
        <span v-if="!isEditingName" @dblclick="toggleEditName" class="text-md">
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
      <div class="flex flex-row items-center gap-3">
        <p v-if="!isEditingDate" @dblclick="toggleEditDate" class="text-md">
          {{
            props.todo.dueDate ? globalStore.formatDate(props.todo.dueDate) : ""
          }}
        </p>
        <input
          v-else
          type="date"
          class="text-md w-32 focus:outline-none"
          v-model="todoRef.dueDate"
          @blur="isEditingDate = false"
          @keyup.enter="handleSubmitEdit"
        />
        <i @click="handleDelete" class="pi pi-trash"></i>
      </div>
    </div>
    <div>
      <span
        v-if="!isEditingContent"
        @dblclick="toggleEditContent"
        class="text-md"
      >
        {{ props.todo.content ? todo.content : "" }}
      </span>
      <input
        v-else
        type="text"
        class="text-md w-32 focus:outline-none"
        v-model="todoRef.content"
        @blur="handleSubmitEdit"
        @keyup.enter="handleSubmitEdit"
      />
    </div>
  </div>
</template>
