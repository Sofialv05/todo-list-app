<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";
import { useTodosStore } from "~/stores/todos";
import type { ITodo } from "~/types";
import { ref, computed } from "vue";

const props = defineProps<{
  todo: ITodo;
  refresh: () => Promise<void>;
}>();

const isShowContent = ref(false);
const isCompleted = ref(props.todo.completed);
const editingField = ref<"name" | "content" | "date" | null>(null);
const todoRef = ref({ ...props.todo });

const globalStore = useGlobalStore();
const todoStore = useTodosStore();

const toggleEdit = (field: "name" | "content" | "date") => {
  editingField.value = editingField.value === field ? null : field;
};

const toggleShowContent = () => {
  isShowContent.value = !isShowContent.value;
};

const toggleCheckbox = async () => {
  await todoStore.changeTodoStatus(props.todo._id);
  isCompleted.value = !isCompleted.value;
};

const handleSubmitEdit = async () => {
  try {
    await todoStore.updateTodo(todoRef.value, props.todo._id);
    editingField.value = null;
    await props.refresh();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const handleDelete = async () => {
  await todoStore.deleteTodo(props.todo._id);
  await props.refresh();
};

const colors = ["green", "yellow", "red"];
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full flex-row items-center justify-between">
      <i
        @click="toggleShowContent"
        :class="{
          'pi-angle-down': isShowContent,
          'pi-angle-right': !isShowContent,
        }"
        class="pi hover:cursor-pointer"
      ></i>
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
        <span
          v-if="editingField !== 'name'"
          @dblclick="toggleEdit('name')"
          class="text-md font-semibold"
        >
          {{ props.todo.name }}
        </span>
        <input
          v-else
          type="text"
          class="text-md w-full font-semibold focus:outline-none"
          v-model="todoRef.name"
          @blur="handleSubmitEdit"
          @keyup.enter="handleSubmitEdit"
        />
      </div>
      <div class="flex flex-row items-center gap-3">
        <p
          v-if="editingField !== 'date'"
          @dblclick="toggleEdit('date')"
          class="text-md"
        >
          {{
            props.todo.dueDate ? globalStore.formatDate(props.todo.dueDate) : ""
          }}
        </p>
        <input
          v-else
          type="date"
          class="text-md w-32 focus:outline-none"
          v-model="todoRef.dueDate"
          @blur="handleSubmitEdit"
          @keyup.enter="handleSubmitEdit"
        />

        <details class="dropdown dropdown-left relative">
          <summary
            tabindex="0"
            @click=""
            :class="['pi', 'pi-flag', 'hover:cursor-pointer']"
          ></summary>

          <div
            tabindex="0"
            class="menu dropdown-content absolute z-20 h-10 w-32 rounded-box bg-base-100 p-2 shadow"
          >
            <div class="flex flex-row justify-around py-2">
              <a class="pi pi-flag hover:cursor-pointer" />
              <a
                v-for="color of colors"
                class="pi pi-flag-fill hover:cursor-pointer"
                :style="{ color: color }"
              />
            </div>
          </div>
        </details>
        <i @click="handleDelete" class="pi pi-trash hover:cursor-pointer"></i>
      </div>
    </div>
    <div v-if="isShowContent" class="w-full">
      <p
        v-if="editingField !== 'content'"
        :class="{ 'text-gray-500': !props.todo.content }"
        @dblclick="toggleEdit('content')"
        class="ml-12 text-sm"
      >
        {{ props.todo.content || "add content here" }}
      </p>
      <textarea
        v-else
        type="text"
        class="ml-12 w-[90%] text-sm focus:outline-none"
        v-model="todoRef.content"
        @blur="handleSubmitEdit"
        @keyup.enter="handleSubmitEdit"
        rows="3"
      />
    </div>
  </div>
</template>
