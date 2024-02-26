<template>
    <input
        :min="min"
        :max="max"
        :step="defaultStep"
        :disabled="isDisabled"
        :style="styleRange"
        @input="getCurrentValue"
        v-model.number="value"
        type="range"
        class="styled-slider slider-progress"
    />
</template>

<script>
export default {
    name: 'BaseRange',
    props: {
        defaultValue: {
            type: Number,
            default: 50,
        },
        defaultStep: {
            type: Number,
            default: 1,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['currentValue'],
    data() {
        return {
            value: this.defaultValue,
        };
    },
    watch: {
        max() {
            if (this.value > this.max) {
                this.value = this.max;
                this.getCurrentValue();
            }
        },
    },
    computed: {
        styleRange() {
            let style = {};

            style['--value'] = this.value;
            style['--min'] = this.min;
            style['--max'] = this.max;

            return style;
        },
    },
    methods: {
        getCurrentValue() {
            this.$emit('currentValue', this.value);
        },
    },
    mounted() {
        this.getCurrentValue();
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/сardProduct.scss';

/* slider */
input[type='range'].styled-slider {
    height: 2.2em;
    -webkit-appearance: none;
}

/* slider progress */
input[type='range'].styled-slider.slider-progress {
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--value) - var(--min)) / var(--range));
    --sx: calc(0.5 * 14px + var(--ratio) * (100% - 14px));
}

input[type='range'].styled-slider:focus {
    outline: none;
}

/* webkit */
input[type='range'].styled-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 16px;
    background: $red-dark;
    border: none;
    box-shadow: 0 0 2px black;
    margin-top: calc(4px * 0.5 - 14px * 0.5);
}

input[type='range'].styled-slider::-webkit-slider-runnable-track {
    height: 4px;
    border: none;
    border-radius: 2px;
    background: $gray-light;
    box-shadow: none;
}

input[type='range'].styled-slider::-webkit-slider-thumb:hover {
    // background: #832020;
    cursor: pointer;
}

input[type='range'].styled-slider:hover::-webkit-slider-runnable-track {
    background: $gray-light;
}

input[type='range'].styled-slider::-webkit-slider-thumb:active {
    background: #832020;
}

input[type='range'].styled-slider:active::-webkit-slider-runnable-track {
    background: $gray-light;
}

input[type='range'].styled-slider.slider-progress::-webkit-slider-runnable-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

input[type='range'].styled-slider.slider-progress:hover::-webkit-slider-runnable-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

input[type='range'].styled-slider.slider-progress:active::-webkit-slider-runnable-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

/* mozilla */
input[type='range'].styled-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 16px;
    background: $red-dark;
    border: none;
    box-shadow: 0 0 2px black;
}

input[type='range'].styled-slider::-moz-range-track {
    height: 4px;
    border: none;
    border-radius: 2px;
    background: $gray-light;
    box-shadow: none;
}

input[type='range'].styled-slider::-moz-range-thumb:hover {
    background: #832020;
}

input[type='range'].styled-slider:hover::-moz-range-track {
    background: $gray-light;
}

input[type='range'].styled-slider::-moz-range-thumb:active {
    background: #832020;
}

input[type='range'].styled-slider:active::-moz-range-track {
    background: $gray-light;
}

input[type='range'].styled-slider.slider-progress::-moz-range-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

input[type='range'].styled-slider.slider-progress:hover::-moz-range-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

input[type='range'].styled-slider.slider-progress:active::-moz-range-track {
    background:
        linear-gradient($red-dark, $red-dark) 0 / var(--sx) 100% no-repeat,
        $gray-light;
}

/* ms */
input[type='range'].styled-slider::-ms-fill-upper {
    background: transparent;
    border-color: transparent;
}

input[type='range'].styled-slider::-ms-fill-lower {
    background: transparent;
    border-color: transparent;
}

input[type='range'].styled-slider::-ms-thumb {
    width: 14px;
    height: 14px;
    border-radius: 16px;
    background: $red-dark;
    border: none;
    box-shadow: 0 0 2px black;
    margin-top: 0;
    box-sizing: border-box;
}

input[type='range'].styled-slider::-ms-track {
    height: 4px;
    border-radius: 2px;
    background: $gray-light;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
}

input[type='range'].styled-slider::-ms-thumb:hover {
    background: #832020;
}

input[type='range'].styled-slider:hover::-ms-track {
    background: $gray-light;
}

input[type='range'].styled-slider::-ms-thumb:active {
    background: #832020;
}

input[type='range'].styled-slider:active::-ms-track {
    background: $gray-light;
}

input[type='range'].styled-slider.slider-progress::-ms-fill-lower {
    height: 4px;
    border-radius: 2px 0 0 2px;
    margin: -undefined 0 -undefined -undefined;
    background: $red-dark;
    border: none;
    border-right-width: 0;
}

input[type='range'].styled-slider.slider-progress:hover::-ms-fill-lower {
    background: $red-dark;
}

input[type='range'].styled-slider.slider-progress:active::-ms-fill-lower {
    background: $red-dark;
}

@include media-query($xs) {
    input[type='range'].styled-slider {
        height: 1.7em;
    }
    input[type='range'].styled-slider::-webkit-slider-thumb {
        width: 13px;
        height: 123x;
        margin-top: calc(3px * 0.5 - 13px * 0.5);
    }
    input[type='range'].styled-slider::-webkit-slider-runnable-track {
        height: 3px;
    }
}
</style>
