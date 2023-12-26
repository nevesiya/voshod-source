<template>
    <base-accordion :show-body-now="open">
        <template v-slot:header>
            <p class="title-filter">Модель</p>
        </template>
        <template v-slot:body>
            <FilterCheckboxMain @selected-all="deleteItems" :selected-items="items" />
            <template v-for="item in options" :key="item">
                <template v-if="item.models">
                    <p class="title-checkbox">{{ item.brand }}</p>

                    <FilterCheckboxItems
                        @selected-items="addItems($event, item.brand)"
                        :names="item.models"
                        :optional-names="item.brand"
                        :display-limit="true"
                        :selected-all="all"
                        :selected-outside="checkPresenceSelectedOutside(item.models)"
                        :current-items="checkPresenceSelectedItems(item.models)"
                    />
                </template>
            </template>
        </template>
    </base-accordion>
</template>

<script>
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue'
import FilterCheckboxItems from '@/components/FilterCheckboxItems.vue'
import FilterCheckboxMain from '@/components/FilterCheckboxMain.vue'
import { useFilterDataStore } from '@/stores/FilterDataStore'

export default {
    name: 'FilterCheckboxModels',
    components: {
        FilterCheckboxItems,
        FilterCheckboxMain,
        BaseAccordion
    },
    props: {
        options: {
            type: Array
        },
        resetSelected: {
            type: Number
        },
        selectedOutside: {
            type: String
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    emits: ['selectedItems'],
    data() {
        return {
            all: [],
            items: [],
            obj: {},
            filterData: useFilterDataStore()
        }
    },
    watch: {
        resetSelected() {
            this.deleteItems()
        }
    },
    methods: {
        addItems(model, brand) {
            this.obj[brand] = model
            this.items = []

            this.items = Object.values(this.obj).flat()
            this.items = Array.from([...new Set(this.items)])

            if (this.filterData.similarModel && this.items.length > 0) {
                this.items = []
            }

            if (!this.items.length || this.items.length > 1) {
                this.items.push(this.filterData.similarModel)
                this.filterData.similarModel = ''
            }

            if (this.items.length == 1 && this.items[this.items.length - 1] == '') {
                this.items = []
            }

            this.$emit('selectedItems', this.items)
        },

        deleteItems() {
            this.all = []
            this.items = []
            this.obj = {}
            this.filterData.similarModel = ''
            this.$emit('selectedItems', this.items)
        },

        checkPresenceSelectedItems(models) {
            let result = this.items.filter((item) => {
                return models.includes(item)
            })

            if (result.length) {
                return result
            }
        },

        checkPresenceSelectedOutside(models) {
            if (models.includes(this.filterData.similarModel)) {
                return this.filterData.similarModel
            }
        },

        deleteIrrelevantItems() {
            const brandOptions = new Set(this.options.map((item) => item.brand))
            Object.keys(this.obj)
                .filter((brand) => !brandOptions.has(brand))
                .forEach((brand) => delete this.obj[brand])
            // this.items = Object.values(this.obj).flat();

            // this.$emit('selectedItems', this.items);
        }
    },
    beforeUpdate() {
        if (!this.filterData.similarModel) {
            this.deleteIrrelevantItems()
        }
    },
    mounted() {
        if (this.filterData.similarModel) {
            this.items.push(this.filterData.similarModel)
        }
    }
}
</script>

<style lang="scss" scoped>
.title-checkbox {
    margin-bottom: 15px;
}
</style>
