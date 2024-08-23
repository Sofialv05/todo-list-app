<template>
  <div
    class="flex h-16 items-center justify-between border-b border-gray-200 bg-white"
  >
    <HamburgerButton />
    <div class="flex items-center px-4">
      <input
        class="mx-4 w-full rounded-md border px-4 py-2"
        type="text"
        placeholder="Search"
      />
    </div>
    <div class="flex items-center pr-4">
      <button
        class="flex items-center text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l-7-7 7-7m5 14l7-7-7-7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
