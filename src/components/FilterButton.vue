<template>
    <div class="sort">
        <input
            type="checkbox"
            class="input"
            :id="name"
            :name="name"
            :value="name"
            :disabled="selectedAll"
            v-model="selectedAll"
            @input="checkSelectedAll"
        />
        <label class="button button--color-red button--size-xs" :for="name">
            Все
        </label>
        <template v-for="option in options" :key="option">
            <input
                type="checkbox"
                :id="option"
                :name="option"
                :value="option"
                class="input"
                v-model="selected"
                @input="checkSelected"
            />
            <label
                class="button button--color-black button--size-xs"
                :for="option"
            >
                {{ option }}
            </label>
        </template>
    </div>
</template>

<script>
export default {
    name: 'FilterButton',
    props: {
        options: {
            type: [Array, Set],
        },
        name: {
            type: String,
        },
        resetSelected: {
            type: Number,
        },
    },
    emits: ['selectedItems'],
    data() {
        return {
            selected: [],
            selectedAll: true,
        };
    },
    methods: {
        checkSelected() {
            setTimeout(() => {
                if (this.selected.length) {
                    this.selectedAll = false;
                } else {
                    this.selectedAll = true;
                }
            });
        },
        checkSelectedAll() {
            this.selected = [];
        },
    },
    watch: {
        selected() {
            this.$emit('selectedItems', this.selected);
        },
        resetSelected() {
            this.selected = [];
            this.selectedAll = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.sort {
    display: flex;
    gap: 20px;
}

.button {
    text-transform: none;
    &--color-red {
        border: 1.5px solid $red-dark;
    }
    &--color-black {
        border: 1.5px solid $black;
    }
    user-select: none;
}

:deep(.button--color-red) {
    &:hover {
        color: $black;
        background: transparent;
        opacity: 0.7;
    }
}

:deep(.button--color-black) {
    &:hover {
        color: $black;
        background: transparent;
        opacity: 0.7;
    }
}

.input {
    width: auto !important;
    position: absolute;
    z-index: -1;
    opacity: 0;
    user-select: none;
}
.input:checked + label.button--color-black {
    background: $black;
    color: $white;
}

.input:checked + label.button--color-red {
    background: $red-dark;
    color: $white;
}

// .input:disabled + label {
//     filter: grayscale(80%);
//     &:hover {
//         opacity: 1;
//     }
// }
</style>
