import { defineStore } from 'pinia';

export const useFilterDataStore = defineStore('FilterDataStore', {
    state: () => ({
        similarModel: '',
    }),
});
