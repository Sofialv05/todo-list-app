<template>
  <div class="flex h-screen flex-row">
    <SideBar />
    <div class="flex w-full flex-col">
      <Navbar />
      <div class="mx-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
