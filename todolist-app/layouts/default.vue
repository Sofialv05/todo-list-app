<template>
  <div class="font-monsterrat flex min-h-screen flex-row">
    <SideBar />
    <div class="flex h-screen w-full flex-col bg-primary pb-20">
      <Navbar />
      <div
        class="mx-4 mt-10 flex h-[90%] flex-col overflow-hidden rounded-xl bg-white p-4 shadow-lg md:mx-16 lg:mx-20 lg:mt-16 lg:min-w-max lg:p-8"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
