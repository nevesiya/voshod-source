<template>
    <div class="filter-checkbox">
        <base-accordion :show-body-now="open">
            <template #header>
                <p class="title-filter">{{ titleFilter }}</p>
            </template>
            <template #body>
                <FilterCheckboxMain
                    @selected-all="all = $event"
                    :selected-items="items"
                />
                <FilterCheckboxItems
                    :names="options"
                    :display-limit="displayLimit"
                    :selected-all="all"
                    @selected-items="items = $event"
                />
            </template>
        </base-accordion>
    </div>
</template>

<script>
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue';
import FilterCheckboxItems from '@/components/FilterCheckboxItems.vue';
import FilterCheckboxMain from '@/components/FilterCheckboxMain.vue';

export default {
    name: 'FilterCheckbox',
    components: {
        FilterCheckboxItems,
        FilterCheckboxMain,
        BaseAccordion,
    },
    props: {
        options: {
            type: Array,
            default: new Array(0),
        },
        displayLimit: {
            type: Boolean,
            default: false,
        },
        resetSelected: {
            type: Number,
        },
        titleFilter: {
            type: String,
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['selectedItems'],
    data() {
        return {
            all: [],
            items: [],
        };
    },
    watch: {
        items() {
            this.$emit('selectedItems', this.items);
        },
        resetSelected() {
            this.all = [];
        },
    },
};
</script>

<style scoped lang="scss">
.filter-checkbox {
    &__button {
        @include font(500, 14px);
        color: $white;
        padding: 5px 10px;
        background: $black;
        border-radius: 2px;
        display: flex;
        align-self: start;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 0.8;
        }
    }
    &__form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__group {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__item {
        // display: flex;
        // gap: 15px;
    }
    &__input {
        width: auto !important;
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    &__input--default {
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
    &__label--default {
        &::before {
            border: 2px solid $red-dark;
        }
    }
    &__title {
    }
}
.title-filter {
}

:deep(.accordion-body) {
}
:deep(.accordion-header) {
    @include flex-between;
    justify-content: flex-start;
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 20px;
    &::after {
        content: '';
        background: url(@/assets/images/arrow-right-small-gray.svg);
        filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.15));
        background-repeat: no-repeat;
        transform: rotate(90deg);
        background-position: center center;
        border-radius: 50%;
        display: block;
        min-width: 24px;
        min-height: 24px;
        margin-left: 8px;
        transition: all ease-in-out 0.25s;
    }
}
:deep(.accordion-header--open) {
    &::after {
        content: '';
        background: url(@/assets/images/arrow-right-small-gray.svg);
        background-repeat: no-repeat;
        transform: rotate(-90deg);
        background-position: center center;
    }
}
:deep(.accordion-item) {
    width: 100%;
}
</style>
