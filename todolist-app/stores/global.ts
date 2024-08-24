import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    isDisplay: false as boolean,
  }),
  actions: {
    toggleSideBar() {
      this.isDisplay = !this.isDisplay;
    },
    formatDate(date: string) {
      return new Date(date).toLocaleDateString("id-ID");
    },
  },
});
