import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, name: "Lab Environment Setup", done: false, dueDate: "June 19, 2026" },
      { id: 2, name: "Build Vue.js Web App", done: true, dueDate: "June 20, 2026" },
    ],
  }),
  getters: {},
  actions: {},
});