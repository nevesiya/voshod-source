import { defineStore } from 'pinia'

export const useSavedScrollPosition = defineStore('SavedScrollPosition', {
    state: () => ({
        currentScrollPosition: ''
    })
})
