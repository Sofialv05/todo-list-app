import { defineStore } from "pinia";

export const useSideBarStore = defineStore("sidebar", {
  state: () => ({
    isDisplay: true as boolean,
  }),
  actions: {
    toggleSideBar() {
      this.isDisplay = !this.isDisplay;
    },
  },
});
