<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";
import { useTodosStore } from "~/stores/todos";
import type { ITodo } from "~/types";
import { ref, computed } from "vue";
import Swal from "sweetalert2";

type ITodoWithoutId = Omit<ITodo, "_id">;

const props = defineProps<{
  todo: ITodo;
  refresh: () => Promise<void>;
}>();

const isShowContent = ref(false);
const isCompleted = ref(props.todo.completed);
const editingField = ref<"name" | "content" | "date" | "">("");
const todoRef = ref<ITodoWithoutId>({
  ...props.todo,
  _id: undefined,
} as ITodoWithoutId);

const globalStore = useGlobalStore();
const todoStore = useTodosStore();

const toggleEdit = (field: "name" | "content" | "date") => {
  editingField.value = editingField.value === field ? "" : field;
};

const toggleShowContent = () => {
  isShowContent.value = !isShowContent.value;
};

const toggleCheckbox = async () => {
  await todoStore.changeTodoStatus(props.todo._id.toString());
  isCompleted.value = !isCompleted.value;
  await props.refresh();
};

const handleSubmitEdit = async () => {
  try {
    await todoStore.updateTodo(todoRef.value, props.todo._id.toString());
    editingField.value = "";
    await props.refresh();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#b6d5e1",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await todoStore.deleteTodo(props.todo._id.toString());
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
    await props.refresh();
  }
};

const handlePriority = async (priority: string) => {
  todoRef.value.priority = priority;
  await todoStore.updateTodo(todoRef.value, props.todo._id.toString());
};

const colors = [
  { color: "red", priority: "high" },
  { color: "yellow", priority: "medium" },
  { color: "green", priority: "low" },
];

const flagPriority = computed(() => {
  const flag = colors.find(
    (color) => color.priority === todoRef.value.priority,
  );
  if (!flag) {
    return { flag: "pi-flag", color: "black" };
  } else {
    return { flag: "pi-flag-fill", color: flag.color };
  }
});
</script>

<template>
  <div class="flex w-full flex-col text-gray-500">
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
          class="text-md ml-2 font-semibold"
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
            props.todo.dueDate
              ? globalStore.formatDate(props.todo.dueDate.toString())
              : ""
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

        <details class="dropdown dropdown-left z-20">
          <summary
            tabindex="0"
            @click=""
            :class="['pi', flagPriority.flag, 'hover:cursor-pointer']"
            :style="{ color: flagPriority.color }"
          ></summary>

          <ul
            class="menu dropdown-content menu-horizontal rounded-box bg-base-200"
          >
            <div class="flex flex-row">
              <li
                @click="handlePriority(color.priority)"
                v-for="color of colors"
              >
                <a
                  class="pi pi-flag-fill hover:cursor-pointer"
                  :style="{ color: color.color }"
                />
              </li>
              <li @click="handlePriority('default')">
                <a class="pi pi-flag hover:cursor-pointer" />
              </li>
            </div>
          </ul>
        </details>
        <i @click="handleDelete" class="pi pi-trash hover:cursor-pointer"></i>
      </div>
    </div>
    <div v-if="isShowContent" class="w-full">
      <p
        v-if="editingField !== 'content'"
        :class="{ 'text-gray-500': !props.todo.content }"
        @dblclick="toggleEdit('content')"
        class="ml-14 text-sm"
      >
        {{ props.todo.content || "add content here" }}
      </p>
      <textarea
        v-else
        type="text"
        class="ml-14 w-[85%] text-sm focus:outline-none"
        v-model="todoRef.content"
        @blur="handleSubmitEdit"
        @keyup.enter="handleSubmitEdit"
        rows="1"
      />
    </div>
  </div>
</template>
