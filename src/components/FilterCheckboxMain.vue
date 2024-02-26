<template>
    <div class="filter-checkbox__item">
        <input
            class="filter-checkbox__input"
            :class="{
                'filter-checkbox__input--default': mainToggleChecked,
            }"
            type="checkbox"
            name="All"
            id="All"
            value="All"
            v-model="mainToggleChecked"
            :disabled="mainToggleDisabled"
            @input="checkSelected"
        />
        <label
            class="filter-checkbox__label"
            :class="{
                'filter-checkbox__label--default': mainToggleChecked,
            }"
            @click="checkSelected"
        >
            Все
        </label>
    </div>
</template>

<script>
export default {
    name: 'FilterCheckboxItemMain',
    props: {
        selectedItems: {
            type: Array,
            default: new Array(0),
        },
    },
    emits: ['selectedAll'],
    data() {
        return {};
    },
    computed: {
        mainToggleChecked() {
            return this.selectedItems.length ? false : true;
        },
        mainToggleDisabled() {
            return this.selectedItems.length ? false : true;
        },
    },
    methods: {
        checkSelected() {
            if (!this.mainToggleDisabled) {
                this.$emit('selectedAll', []);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.filter-checkbox {
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
    &__input--default:checked + label::before {
        background-image: url('@/assets/images/check-red.svg');
    }
    &__item {
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
            border: 2px solid $red-dark;
            border-radius: 2px;
            margin-right: 10px;
        }
    }
    &__label--default {
        &::before {
        }
    }
}
</style>
