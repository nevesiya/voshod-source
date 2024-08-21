<template>
    <div class="sort">
        <input
            type="checkbox"
            class="input"
            :id="name + uniqueId"
            :name="name"
            :value="name"
            :disabled="selectedAll"
            v-model="selectedAll"
            @input="checkSelectedAll"
        />
        <label
            class="button button--color-red button--size-xs"
            :for="name + uniqueId"
        >
            Все
        </label>
        <template v-for="option in options" :key="option">
            <input
                type="checkbox"
                :class="{ sdfasf: this.selected.includes(option) }"
                :id="option + uniqueId"
                :name="option"
                :value="option"
                class="input"
                v-model="selected"
                @input="checkSelected"
            />
            <label
                class="button button--color-black button--size-xs"
                :for="option + uniqueId"
            >
                {{ option }}
            </label>
        </template>
    </div>
</template>

<script>
import helpers from '@/helpers/global';

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
            uniqueId: helpers.getRandomString(),
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

            if (!this.name) {
                return;
            }

            const query = { ...this.$route.query };

            if (!this.selected.length) {
                delete query[this.name];
            } else {
                query[this.name] = this.selected.join(',');
            }

            this.$router.replace({
                query: {
                    ...query,
                },
            });
        },
        resetSelected() {
            this.selected = [];
            this.selectedAll = true;
        },
    },
    async mounted() {
        await this.$nextTick();

        if (!Array.isArray(this.options)) {
            return;
        }

        const query = { ...this.$route.query };

        if (!query[this.name]) {
            return;
        }

        const param = query[this.name].split(',');

        this.selected = param?.filter((item) => {
            return [...this.options].includes(item);
        });

        this.$emit('selectedItems', this.selected);
    },
};
</script>

<style lang="scss" scoped>
.sort {
    display: flex;
    flex-wrap: wrap;
    @include adaptive-value('gap', 20, 8, 0, 1400);
}

.button {
    text-transform: none;
    user-select: none;
    &--color-red {
        border: 1.5px solid $red-dark;
    }
    &--color-black {
        border: 1.5px solid $black;
    }
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
</style>
