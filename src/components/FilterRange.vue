<template>
    <div class="filter-range">
        <base-accordion :show-body-now="open">
            <template #header>
                <p for="range" class="filter-range__title title-filter">
                    {{ titleFilter }}
                </p>
            </template>
            <template #body>
                <template v-if="valueType === 'amount'">
                    <form class="input-value">
                        <input
                            class="input-value__min"
                            type="text"
                            :placeholder="this.valueMin.toLocaleString('ru-RU')"
                            maxlength="10"
                            v-imask="maskAmount"
                            v-model="inputMin"
                            @input="checkEndInputMin"
                            @blur="addValueMinRange"
                        />
                        <input
                            class="input-value__max"
                            type="text"
                            :placeholder="this.valueMax.toLocaleString('ru-RU')"
                            maxlength="10"
                            v-imask="maskAmount"
                            v-model="inputMax"
                            @input="checkEndInputMax"
                            @blur="addValueMaxRange"
                        />
                    </form>
                </template>
                <template v-if="valueType === 'year'">
                    <div class="input-value">
                        <input
                            class="input-value__min"
                            type="text"
                            :placeholder="this.valueMin"
                            maxlength="4"
                            v-imask="maskYear"
                            v-model="inputMin"
                            @input="checkEndInputMin"
                            @blur="addValueMinRange"
                        />
                        <input
                            class="input-value__max"
                            type="text"
                            :placeholder="this.valueMax"
                            maxlength="4"
                            v-imask="maskYear"
                            v-model="inputMax"
                            @input="checkEndInputMax"
                            @blur="addValueMaxRange"
                        />
                    </div>
                </template>
                <div class="filter-range__slider">
                    <Slider
                        :step="currentStep"
                        v-bind:value="slider.value"
                        v-bind="slider"
                        @slide="addValueInput"
                        @change="tranferValue"
                    />
                </div>
            </template>
        </base-accordion>
    </div>
</template>

<script>
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue';

import helpers from '@/helpers/global';
import Slider from '@vueform/slider';
import { IMaskDirective } from 'vue-imask';
import '@vueform/slider/themes/default.scss';

export default {
    name: 'FilterRange',
    components: { Slider, BaseAccordion },
    directives: {
        imask: IMaskDirective,
    },
    props: {
        titleFilter: {
            type: String,
        },
        valueMin: {
            type: Number,
        },
        valueMax: {
            type: Number,
        },
        valueType: {
            type: String,
        },
        resetSelected: {
            type: Number,
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['selectedMin', 'selectedMax'],
    data() {
        return {
            slider: {
                value: [this.valueMin, this.valueMax],
                min: this.valueMin,
                max: this.valueMax,
                tooltips: false,
                lazy: false,
            },
            maskAmount: {
                mask: Number, // enable number mask
                scale: 0, // digits after point, 0 for integers
                thousandsSeparator: ' ', // any single char
                padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
                normalizeZeros: true, // appends or removes zeros at ends
                radix: ',', // fractional delimiter
                mapToRadix: ['.'], // symbols to process as radix
            },
            maskYear: {
                mask: '0000',
                lazy: true,
                placeholderChar: '0',
            },
            inputMin: '',
            inputMax: '',
        };
    },
    watch: {
        valueMin() {
            this.slider.min = this.valueMin;
            this.slider.value[0] = this.valueMin;
        },
        valueMax() {
            this.slider.max = this.valueMax;
            this.slider.value[1] = this.valueMax;
        },
        resetSelected() {
            this.inputMin = this.inputMax = '';
            this.addValueMinRange();
            this.addValueMaxRange();
        },
    },
    computed: {
        currentStep() {
            let tmp;

            if (this.valueType === 'amount') {
                tmp = 1000;
            } else if (this.valueType === 'year') {
                tmp = 1;
            }

            return tmp;
        },
    },
    methods: {
        addValueInput(e) {
            this.slider.value[0] = e[0];
            this.slider.value[1] = e[1];

            if (e[0] != this.valueMin) {
                this.inputMin = e[0];
            } else {
                this.inputMin = '';
            }

            if (e[1] != this.valueMax) {
                this.inputMax = e[1];
            } else {
                this.inputMax = '';
            }
        },

        addValueMinRange() {
            this.inputMin = String(this.inputMin);
            this.inputMin = this.inputMin.replace(/\s/g, '');

            if (
                this.inputMin > this.valueMin &&
                this.inputMin < this.valueMax &&
                (this.inputMin < this.inputMax || this.inputMax == '')
            ) {
                this.slider.value[0] = this.inputMin;
            } else {
                this.slider.value[0] = this.valueMin;
                this.inputMin = '';
            }

            this.$emit('selectedMin', this.inputMin);
        },

        addValueMaxRange() {
            this.inputMax = String(this.inputMax);
            this.inputMax = this.inputMax.replace(/\s/g, '');

            if (
                this.inputMax < this.valueMax &&
                this.inputMax > this.valueMin &&
                this.inputMax > this.inputMin
            ) {
                this.slider.value[1] = this.inputMax;
            } else {
                this.slider.value[1] = this.valueMax;
                this.inputMax = '';
            }

            this.$emit('selectedMax', this.inputMax);
        },

        checkEndInputMin: helpers.debounce(function () {
            this.addValueMinRange();
        }, 2000),

        checkEndInputMax: helpers.debounce(function () {
            this.addValueMaxRange();
        }, 2000),

        tranferValue() {
            this.$emit('selectedMin', this.inputMin);
            this.$emit('selectedMax', this.inputMax);
        },
    },
};
</script>

<style scoped lang="scss">
.filter-range {
    &__label {
    }
    &__slider {
        max-width: 290px;
        margin: 0 auto 30px;
        margin-bottom: 30px;
    }
}
.input-value {
    @include flex-between;
    margin-bottom: 20px;
    & input {
        width: 120px;
    }
    &__max {
    }
    &__min {
    }
}

::v-deep {
    .accordion-header {
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
}

::v-deep {
    .accordion-header--open {
        &::after {
            content: '';
            background: url(@/assets/images/arrow-right-small-gray.svg);
            background-repeat: no-repeat;
            transform: rotate(-90deg);
            background-position: center center;
        }
    }
}
::v-deep {
    .accordion-item {
        width: 100%;
    }
}

// ::v-deep {
//     .slider-conect {
//         background-color: $red-dark;
//     }
// }

// ::v-deep {
//     .slider-origin {
//         top: 1px;
//     }
// }

// ::v-deep {
//     .slider-target {
//         height: 2px;
//         margin: 0 auto 5px;
//     }
// }

// ::v-deep {
//     .slider-handle {
//         width: 12px;
//         height: 12px;
//         background-color: $red-dark;
//         box-shadow: none;
//         transition: all 0.2s ease-in-out;
//         &:focus {
//             filter: brightness(80%);
//             box-shadow: none;
//         }
//     }
// }

::v-deep {
    .slider-connect {
        background-color: $red-dark;
    }
}

::v-deep {
    .slider-origin {
        top: 1px;
    }
}

::v-deep {
    .slider-target {
        height: 2px;
        margin: 0 auto 5px;
    }
}

::v-deep {
    .slider-handle {
        width: 12px;
        height: 12px;
        background-color: $red-dark;
        box-shadow: none;
        transition: all 0.2s ease-in-out;
        &:focus {
            filter: brightness(80%);
            box-shadow: none;
        }
    }
}

input,
textarea {
    border-bottom: 2px solid $gray-light;
    padding: 9px 15px;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        @include font(400, 16px, 140%);
        color: $gray;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        border-bottom: 2px solid $black;
    }
}

input {
    &[type] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}

textarea {
    outline: none;
    resize: none;
    overflow: hidden;

    &[name] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}
input,
textarea {
    border-bottom: 2px solid $gray-light;
    padding: 9px 15px;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        @include font(400, 16px, 140%);
        color: $gray;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        border-bottom: 2px solid $black;
    }
}

input {
    &[type] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}

textarea {
    outline: none;
    resize: none;
    overflow: hidden;

    &[name] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}
</style>
