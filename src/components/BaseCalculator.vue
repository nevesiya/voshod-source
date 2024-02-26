<template>
    <div class="calculator">
        <div class="calculator__down-payment">
            <ul class="calculator__table">
                <li class="calculator__table-option">Первый взнос</li>
                <li class="calculator__table-value">
                    {{ transformToLocaleString }}
                    ₽
                </li>
            </ul>
            <BaseRange
                v-if="dynamicProductPrice"
                class="calculator__input"
                :min="1000"
                :max="productPrice"
                :default-value="initialDownPayment"
                :default-step="1000"
                @current-value="valueDownPayment = $event"
            />
            <BaseRange
                v-else
                class="calculator__input"
                :min="1000"
                :max="productPrice"
                :default-value="defaultDownPayment"
                :default-step="1000"
                @current-value="valueDownPayment = $event"
            />
        </div>
        <div class="calculator__term-payment">
            <ul class="calculator__table">
                <li class="calculator__table-option">Срок</li>
                <li class="calculator__table-value">
                    {{ valueTermPayment }} мес.
                </li>
            </ul>
            <BaseRange
                class="calculator__input"
                :default-value="termPayment"
                :min="1"
                :max="120"
                @current-value="valueTermPayment = $event"
            />
        </div>
        <div class="calculator__calculation-result">
            <p class="calculator__calculation-day">
                {{ resultDay.toLocaleString() }} ₽
                <span>в сутки</span>
            </p>
            <p class="calculator__calculation-month">
                {{ resultMonth.toLocaleString() }} ₽
                <span>в месяц</span>
            </p>
        </div>
    </div>
</template>

<script>
import BaseRange from '@/components/UI/Input/BaseRange.vue';

export default {
    name: 'BaseCalculator',
    components: { BaseRange },
    props: {
        percentDownPayment: {
            type: Number,
            default: 20,
        },
        termPayment: {
            type: Number,
            default: 24,
        },
        productPrice: {
            type: Number,
        },
        initialDownPayment: {
            type: Number,
            default: 0,
        },
        dynamicProductPrice: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            valueDownPayment: '',
            valueTermPayment: '',
        };
    },
    watch: {},
    computed: {
        resultDay() {
            return Math.round(this.resultMonth / 30);
        },

        resultMonth() {
            return Math.round(
                (this.productPrice - this.valueDownPayment) /
                    this.valueTermPayment,
            );
        },

        defaultDownPayment() {
            return Math.round(
                (this.productPrice * this.percentDownPayment) / 100,
            );
        },

        transformToLocaleString() {
            return this.valueDownPayment.toLocaleString();
        },
    },
};
</script>

<style lang="scss" scoped>
.calculator {
    display: flex;
    flex-direction: column;
    &__calculation-day {
        @include font(500, 31px);
        & span {
            @include font(500, 16px);
            margin-left: 6px;
        }
    }
    &__calculation-month {
        @include font(500, 31px);
        & span {
            @include font(500, 16px);
            margin-left: 6px;
        }
    }
    &__calculation-result {
        display: flex;
        justify-content: space-between;
        gap: 50px;
    }
    &__down-payment {
    }
    &__input {
        width: 100%;
    }
    &__table {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__table-option {
        @include font(500, 16px);
    }
    &__table-value {
        @include font(500, 20px);
    }
    &__term-payment {
    }
}

@include media-query($sm) {
    .calculator {
        &__calculation-day {
            font-size: 24px;
        }
        &__calculation-month {
            font-size: 24px;
        }
    }
}

@include media-query($xs) {
    .calculator {
        &__table-option {
            @include font(400, 12px);
        }
        &__table-value {
            @include font(300, 16px);
        }
        &__calculation-day {
            @include font(400, 17px);
            & span {
                @include font(300, 10px);
            }
        }
        &__calculation-month {
            @include font(400, 17px);
            & span {
                @include font(300, 10px);
            }
        }
    }
}
</style>
