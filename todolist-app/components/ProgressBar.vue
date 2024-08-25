<script setup lang="ts">
const props = defineProps<{
  progress: { completedTask: string; progress: string };
}>();
</script>

<template>
  <div class="mb-1 flex justify-between">
    <span class="text-sub2 text-xs font-medium">Task Completion</span>
    <span class="text-sub2 text-xs font-medium">{{
      props.progress.completedTask
    }}</span>
  </div>
  <div class="h-2 w-full rounded-full bg-gray-200">
    <div
      class="bg-sub2 h-2 rounded-full"
      :style="{ width: props.progress.progress }"
    ></div>
  </div>
</template>
