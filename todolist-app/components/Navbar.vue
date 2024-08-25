<script setup lang="ts">
const handleLogout = () => {
  const cookieStore = useCookie("token");
  cookieStore.value = null;
  navigateTo("/auth/login");
};
</script>
<template>
  <div class="flex h-16 items-center border-b border-gray-200 bg-white py-4">
    <HamburgerButton />

    <div class="ml-auto pr-4">
      <button
        @click="handleLogout"
        class="flex items-center rounded-md p-2 font-bold text-red-500 hover:bg-gray-300 focus:text-gray-700 focus:outline-none"
      >
        <i class="pi pi-sign-out"></i>
      </button>
    </div>
  </div>
</template>
