<template>
  <div class="flex h-screen flex-row">
    <SideBar />
    <div class="flex flex-1 flex-col overflow-y-auto">
      <Navbar />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
