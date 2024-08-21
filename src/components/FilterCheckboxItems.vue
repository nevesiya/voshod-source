<template>
    <div class="filter-checkbox__items">
        <div
            class="filter-checkbox__item"
            v-for="name in splitNames(0, this.displayQuantity)"
            :key="name"
        >
            <input
                class="filter-checkbox__input"
                type="checkbox"
                :name="name"
                :id="name"
                :value="name"
                v-model="selected"
                @change="selectedItems"
            />
            <label class="filter-checkbox__label" :for="name">
                {{ checkModel(name, optionalNames) }}
            </label>
        </div>
    </div>
    <button
        v-if="limit && displayLimit && !selectedMoreDisplayQuantity"
        class="filter-checkbox__button"
        @click="insreaseDisplayQuantity"
    >
        Показать ещё ({{ quantity }})
    </button>
</template>

<script>
import helpers from '@/helpers/global';
import { useFilterDataStore } from '@/stores/FilterDataStore';

export default {
    name: 'FilterCheckboxItem',
    props: {
        names: {
            type: Array,
            default: new Array(0),
        },
        optionalNames: {
            type: String,
            default: '',
        },
        displayLimit: {
            type: Boolean,
            default: false,
        },
        selectedAll: {
            type: Array,
            default: new Array(0),
        },
        selectedOutside: {
            type: String,
            default: '',
        },
        currentItems: {
            type: Array,
            default: new Array(0),
        },
        id: {
            type: String,
            default: '',
        },
    },
    emits: ['selectedItems'],
    data() {
        return {
            selected: [],
            displayQuantity: 5,
            filterData: useFilterDataStore(),
        };
    },
    watch: {
        selectedAll() {
            this.selected = [];
            this.selectedItems();
        },
        currentItems() {
            if (this.currentItems.length != this.selected.length) {
                this.selected = this.currentItems;
                this.$emit('selectedItems', this.selected);
            }
        },
        selectedOutside: {
            handler() {
                if (this.selectedOutside) {
                    this.addItemOutside();
                }
            },
            deep: true,
        },
    },
    computed: {
        selectedMoreDisplayQuantity() {
            return this.currentItems.find((item) => {
                return this.names.indexOf(item) > this.displayQuantity - 1;
            });
        },
        quantity() {
            return this.names.length - this.displayQuantity;
        },
        limit() {
            return this.displayQuantity >= this.names.length ? false : true;
        },
    },
    methods: {
        selectedItems() {
            this.$emit('selectedItems', this.selected);

            if (!this.id) {
                return;
            }

            const query = { ...this.$route.query };

            if (!this.selected.length) {
                delete query[this.id];
            } else {
                query[this.id] = this.selected.join(',');
            }

            this.$router.replace({
                query: {
                    ...query,
                },
            });
        },

        splitNames(start, end) {
            if (this.selectedMoreDisplayQuantity) {
                return this.names;
            }

            if (this.displayLimit && this.names.length > this.displayQuantity) {
                return this.names.slice(start, end);
            } else {
                return this.names;
            }
        },

        insreaseDisplayQuantity() {
            this.displayQuantity = this.names.length;
        },

        checkModel(model, brand) {
            return helpers.removeBrandReplay(model, brand);
        },

        addItemOutside() {
            this.selected = [];
            if (this.selectedOutside) {
                this.selected.push(this.selectedOutside);
            }
            this.selectedItems();
        },
    },
    mounted() {
        const unwatch = this.$watch('names', () => {
            const query = { ...this.$route.query };

            if (!query[this.id]) {
                return;
            }

            const param = query[this.id].split(',');

            this.selected = param?.filter((item) => {
                return [...this.names].includes(item);
            });

            this.$emit('selectedItems', this.selected);
            unwatch();
        });
    },
};
</script>

<style lang="scss" scoped>
.filter-checkbox {
    &__button {
        @include font(500, 14px);
        color: $white;
        padding: 5px 10px 5px;
        background: $black;
        border-radius: 2px;
        display: flex;
        align-self: start;
        transition: all 0.2s ease-in-out;
        margin: 15px 0;

        &:hover {
            opacity: 0.8;
        }
    }
    &__input {
        width: auto !important;
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    &__input:checked + label::before {
        content: '';
        display: inline-block;
        background-image: url('@/assets/images/check.svg');
        background-position: center;
        background-repeat: no-repeat;
    }
    &__item {
        transition: opacity 0.25s ease-in-out;
        &:hover {
            opacity: 0.7;
        }
    }
    &__items {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;
    }
    &__label {
        display: flex;
        align-items: center;
        user-select: none;
        height: 17px;
        @include font(500, 14px);
        &::before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid $black;
            border-radius: 2px;
            margin-right: 10px;
        }
    }
}
.list-complete-item {
}
</style>
