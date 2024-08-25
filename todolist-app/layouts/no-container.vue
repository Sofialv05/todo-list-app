<template>
  <div class="font-monsterrat flex min-h-screen flex-row">
    <SideBar />
    <div class="flex h-screen w-full flex-col bg-primary pb-20">
      <Navbar />
      <div class="mx-20 mt-16 flex h-[90%] min-w-max flex-col overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>
