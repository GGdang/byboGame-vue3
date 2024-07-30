import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', {
  state: () => {
    return {
      count: 0
    }
  },
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
