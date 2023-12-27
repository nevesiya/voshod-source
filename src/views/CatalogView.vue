<template>
    <div class="wrapper">
        <main class="main">
            <div class="main-catalog">
                <div class="main-sidebar">
                    <button
                        :disabled="disabledResetButton"
                        @click="resetFilter"
                        class="button button--reset button--color-red button--size-xs"
                    >
                        Сбросить фильтр
                    </button>
                    <filter-range
                        title-filter="Цена"
                        value-type="amount"
                        :value-min="minPrice"
                        :value-max="maxPrice"
                        :reset-selected="reset"
                        :open="!loading"
                        @selected-min="selectMinPrice = $event"
                        @selected-max="selectMaxPrice = $event"
                    ></filter-range>
                    <filter-checkbox
                        title-filter="Марка"
                        :reset-selected="reset"
                        :options="brand"
                        :open="!loading"
                        @selected-items="selectBrand = $event"
                    ></filter-checkbox>
                    <FilterCheckboxModels
                        @selected-items="selectModel = $event"
                        :options="model"
                        :reset-selected="reset"
                        :selected-outside="selectedModelOutsideItems"
                        :open="!loading"
                    />
                    <filter-checkbox
                        title-filter="Кузов"
                        :reset-selected="reset"
                        :options="body"
                        :open="!loading"
                        @selected-items="selectBody = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Коробка передач"
                        :reset-selected="reset"
                        :options="transmission"
                        :open="!loading"
                        @selected-items="selectTransmission = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Привод"
                        :reset-selected="reset"
                        :options="drive"
                        :open="!loading"
                        @selected-items="selectDrive = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Вид топлива"
                        :reset-selected="reset"
                        :options="fuel"
                        :open="!loading"
                        @selected-items="selectFuel = $event"
                    ></filter-checkbox>
                    <filter-range
                        title-filter="Год выпуска"
                        value-type="year"
                        :value-min="minYear"
                        :value-max="maxYear"
                        :reset-selected="reset"
                        :open="!loading"
                        @selected-min="selectMinYear = $event"
                        @selected-max="selectMaxYear = $event"
                    ></filter-range>
                </div>
                <div class="main-content">
                    <base-toast>
                        <template #content>
                            <img src="@/assets/images/attention.svg" alt="attention icon" />

                            <p class="attention-box">
                                <span class="attention-box__title"
                                    >В каталоге представлены автомобили, которые проходят по
                                    программам лизинга. </span
                                ><span class="attention-box__text"
                                    >Если Вам необходим автомобиль в аренду перейдите в раздел
                                    <router-link to="/rent">Аренда</router-link>.
                                </span>
                            </p>
                        </template>
                        <template #close>
                            <img src="@/assets/images/close-circle.svg" alt="close circle"
                        /></template>
                    </base-toast>
                    <div class="filter-group">
                        <BaseSkeleton :height="'30px'" :width="'100%'" v-if="loading" />
                        <template v-else>
                            <FilterButton
                                name="condition"
                                :reset-selected="reset"
                                :options="condition"
                                @selected-items="selectCondition = $event"
                            />
                            <FilterButton
                                name="promo"
                                :options="promo"
                                :reset-selected="reset"
                                @selected-items="selectPromo = $event"
                            />
                        </template>
                    </div>

                    <div class="product">
                        <template v-if="loading">
                            <template v-for="i in 15" :key="i">
                                <CardSkeleton />
                            </template>
                        </template>
                        <template v-if="filteringProduct.length">
                            <TransitionGroup name="collapse">
                                <template
                                    v-for="product in filteringProduct.slice(pageStart, pageEnd)"
                                    :key="product.id"
                                >
                                    <CardLeasing
                                        @selected-model="selectedModelFromCard($event)"
                                        :product="product"
                                    />
                                </template>
                            </TransitionGroup>
                        </template>
                    </div>
                    <div v-if="!filteringProduct.length && !loading" class="product-null">
                        Ничего не найдено
                    </div>
                    <BaseBanner
                        :title="'Не нашли ничего подходящего?'"
                        :text="'Предложите свой вариант!'"
                        :button="'Оставить заявку'"
                        @click-button="showModalCallback = true"
                    />
                    <div class="modal-callback">
                        <transition name="fade">
                            <ModalCallback
                                v-if="showModalCallback"
                                :show-modal="showModalCallback"
                                @close-modal="showModalCallback = false"
                        /></transition>
                    </div>
                    <BasePagination
                        :total-amount-data="filteringProduct.length"
                        @actual-page="(pageStart = $event.start), (pageEnd = $event.end)"
                    />
                    <!-- <BaseFooterSimple /> -->
                </div>
            </div>
            <BaseFooterSimple />
        </main>
    </div>
</template>

<script>
import CardLeasing from '@/components/UI/Card/CardLeasing.vue'
import BaseToast from '@/components/UI/Toast/BaseToast.vue'
import ModalCallback from '@/components/UI/Modal/ModalCallback.vue'

import PageProductMixin from '@/mixins/PageProductMixin'
import helpers from '@/helpers/global'
import { fetchData } from '@/utils/apiUtils'
import { useFilterDataStore } from '@/stores/FilterDataStore'

export default {
    components: {
        CardLeasing,
        BaseToast,
        ModalCallback
    },
    mixins: [PageProductMixin],
    data() {
        return {
            leasingCar: '',
            selectedModelOutsideItems: '',
            showModalCallback: false,
            filterData: useFilterDataStore()
        }
    },
    watch: {
        // filterData: {
        //     handler() {
        //         console.log('filterData')
        //         this.selectedModelOutsideItems = this.filterData.similarModel
        //     },
        //     deep: true
        // }
    },
    methods: {
        async getLeasingCars() {
            this.loading = true

            const path = import.meta.env.DEV
                ? `public/data/leasing_car.json`
                : `data/leasing_car.json`

            this.leasingCar = await fetchData(
                'https://my.api.mockaroo.com/leasing_cars.json?key=a84cf050*',
                `${import.meta.env.BASE_URL}${path}`
            )

            if (typeof this.leasingCar === 'object') {
                this.actionsAfterGettingData()
            }

            this.loading = false
        },

        actionsAfterGettingData() {
            this.product = helpers.getCarProducts(this.leasingCar)
            this.getDataFilter()
        },

        getDataFilter() {
            this.model = helpers.getCarModels(this.product)
            this.brand = helpers.getUniqueElements(this.product, 'brand')
            this.promo = helpers.getUniqueElements(this.product, 'promo')
            this.drive = helpers.getUniqueElements(this.product, 'drive')
            this.fuel = helpers.getUniqueElements(this.product, 'fuel')
            this.body = helpers.getUniqueElements(this.product, 'body')
            this.transmission = helpers.getUniqueElements(this.product, 'transmission')
            this.condition = helpers.getUniqueElements(this.product, 'condition')
            ;[this.minPrice, this.maxPrice] = helpers.findMinMaxDigits(this.product, 'price')
            ;[this.minYear, this.maxYear] = helpers.findMinMaxDigits(this.product, 'year')
        },

        resetFilter() {
            this.getDataFilter()
            this.reset++
            this.filterData.similarModel = ''
        },

        selectedModelFromCard(e) {
            this.filterData.similarModel = e
        }
    },
    created() {
        this.getLeasingCars()
    },
    mounted() {
        if (this.filterData.similarModel) {
            this.selectedModelOutsideItems = this.filterData.similarModel
        }
    },
    unmounted() {
        this.filterData.similarModel = ''
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/styles/theme.scss';
@import '@/assets/styles/pageProduct.scss';

::v-deep {
    .toast {
        display: flex;
        min-width: 100%;
        position: relative;
        border-radius: 2px;
        border: 1px solid rgba(191, 53, 53, 0.5);
        background: #fff;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
        padding: 15px 20px;
        margin-bottom: 60px;

        &::after {
            content: '';
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            right: -10px;
            top: -10px;
            z-index: 8;
            background: $white;
            cursor: pointer;
        }

        &__content {
            display: flex;

            & img {
                margin-right: 20px;
            }
        }

        &__close {
            position: absolute;
            width: 20px;
            height: 20px;
            right: -10px;
            top: -10px;
            z-index: 9;
            cursor: pointer;
        }
    }
}

.attention-box {
    display: flex;
    flex-direction: column;

    & * {
        @include font(400, 14px, 140%);
        letter-spacing: 0.14px;
    }

    &__text {
        & a {
            color: $red-dark;
        }
    }
}
</style>
