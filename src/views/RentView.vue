<template>
    <div class="wrapper">
        <div class="main">
            <div class="main-header">
                <base-accordion>
                    <template #header>
                        <p class="main-header__title">Условия аренды</p>
                    </template>
                    <template #body>
                        <div class="main-header__box">
                            <div class="main-header__box-info">
                                <h2 class="main-header__box-title">
                                    Быстрая аренда автомобилей
                                </h2>
                                <p class="main-header__box-text">
                                    Вы можете забронировать автомобиль в аренду
                                    на сайте самостоятельно или позвонить нам по
                                    телефону:
                                </p>
                                <a
                                    class="main-header__box-tel"
                                    href="tel:+7 (812) 317-68-15"
                                >
                                    +7 (812) 317-68-15
                                </a>
                            </div>
                            <div class="main-header__questions">
                                <div class="main-header__questions-accordion">
                                    <BaseQuestion
                                        :questions="questionsRent"
                                        :start-slice="0"
                                        :end-slice="2"
                                    />
                                </div>
                                <div class="main-header__questions-accordion">
                                    <BaseQuestion
                                        :questions="questionsRent"
                                        :start-slice="2"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </base-accordion>
            </div>
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
                    <div class="filter-group">
                        <BaseSkeleton
                            :height="'30px'"
                            :width="'100%'"
                            v-if="loading"
                        />
                        <template v-else>
                            <FilterButton
                                :reset-selected="reset"
                                @selected-items="selectService = $event"
                                name="service"
                                :options="service"
                            />
                            <FilterButton
                                :reset-selected="reset"
                                @selected-items="selectStatus = $event"
                                name="status"
                                :options="status"
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
                                    v-for="product in filteringProduct.slice(
                                        pageStart,
                                        pageEnd
                                    )"
                                    :key="product.id"
                                >
                                    <CardRent
                                        @more-details="
                                            openDetailsProductPage($event)
                                        "
                                        :product="product"
                                    />
                                </template>
                            </TransitionGroup>
                        </template>
                        <transition name="fade">
                            <ModalRentDetail
                                v-if="showModalRentMore"
                                :product="productMoreDetails"
                                @closeModal="
                                    (showModalRentMore = false),
                                        $router.push('/rent')
                                "
                            />
                        </transition>
                    </div>
                    <div
                        v-if="!filteringProduct.length && !loading"
                        class="product-null"
                    >
                        Ничего не найдено
                    </div>
                    <BaseBanner
                        :title="'Не нашли ничего подходящего?'"
                        :text="'Приобретите в лизинг!'"
                        :button="'Перейти'"
                        @click-button="this.$router.push('/catalog')"
                    />
                    <BasePagination
                        :total-amount-data="filteringProduct.length"
                        @actual-page="
                            (pageStart = $event.start), (pageEnd = $event.end)
                        "
                    />
                </div>
            </div>
            <BaseFooterSimple />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import BaseQuestion from '@/components/BaseQuestion.vue'
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue'
import CardRent from '@/components/UI/Card/CardRent.vue'
import PageProductMixin from '@/mixins/PageProductMixin'
import helpers from '@/helpers/global'
import { fetchData } from '@/utils/apiUtils'

export default {
    components: {
        BaseQuestion,
        ModalRentDetail: defineAsyncComponent(
            () => import('@/components/UI/Modal/ModalRentDetail.vue')
        ),
        CardRent,
        BaseAccordion
    },
    mixins: [PageProductMixin],
    data() {
        return {
            questionsRent: [
                {
                    question: 'Как арендовать автомобиль?',
                    answer: [
                        'забронировать автомобиль онлайн самостоятельно или позвонить и уточнить наличие свободных автомобилей или приехать и выбрать лично',
                        'подписать договор аренды автомобиля',
                        'внести оплату (залог + стоимость аренды)'
                    ]
                },
                {
                    question: 'Требования к водителю',
                    answer: [
                        'водительское удостоверение',
                        'паспорт',
                        'стаж вождения от 3-х лет',
                        'постоянная или временная регистрация сроком не менее 6 месяцев на территории РФ'
                    ]
                },
                {
                    question: 'Условия аренды',
                    answer: [
                        'минимальное время проката от 2-х суток (максимальное не ограничено)',
                        'автомобили технически исправны и не старше 3-х лет',
                        'все автомобили застрахованы (ОСАГО, КАСКО)',
                        'автомобили чистые и заправлены'
                    ]
                },
                {
                    question: 'Условия возврата ',
                    answer: [
                        'возврат автомобиля осуществляется в период с 10 до 11 утра',
                        'автомобили технически исправнсообщить о сдаче автомобиля необходимо не позднее чем за 2-е суток и не старше 3-х лет',
                        'втомобиль должен быть чистым и заправлен'
                    ]
                }
            ],
            rentCar: '',
            productMoreDetails: '',
            showModalRentMore: false
        }
    },
    methods: {
        async getRentCars() {
            this.loading = true

            const path = import.meta.env.DEV
                ? `public/data/rent_car.json`
                : `data/rent_car.json`

            this.rentCar = await fetchData(
                'https://my.api.mockaroo.com/rent_cars.json?key=a84cf050*',
                `${import.meta.env.BASE_URL}${path}`
            )

            if (typeof this.rentCar === 'object') {
                this.actionsAfterGettingData()
            }

            this.loading = false
        },

        actionsAfterGettingData() {
            this.product = helpers.getCarProducts(this.rentCar)
            this.getDataFilter()
            this.checkOpenDetailsProduct()
        },

        getDataFilter() {
            this.model = helpers.getCarModels(this.product)
            this.brand = helpers.getUniqueElements(this.product, 'brand')
            this.status = helpers.getUniqueElements(this.product, 'status')
            this.drive = helpers.getUniqueElements(this.product, 'drive')
            this.fuel = helpers.getUniqueElements(this.product, 'fuel')
            this.body = helpers.getUniqueElements(this.product, 'body')
            this.transmission = helpers.getUniqueElements(
                this.product,
                'transmission'
            )
            this.service = helpers.getUniqueElements(this.product, 'service')
            ;[this.minPrice, this.maxPrice] = helpers.findMinMaxDigits(
                this.product,
                'price'
            )
            ;[this.minYear, this.maxYear] = helpers.findMinMaxDigits(
                this.product,
                'year'
            )
        },

        checkOpenDetailsProduct() {
            if (this.$route.params.id) {
                this.product = helpers.getCarProducts(this.rentCar)
                let currentProduct = helpers.searchProduct(
                    this.product,
                    'id',
                    this.$route.params.id
                )

                currentProduct
                    ? this.openDetailsProductPage(currentProduct)
                    : this.$router.push({ path: '/404' })
            }
        },

        openDetailsProductPage(e) {
            this.productMoreDetails = e
            this.showModalRentMore = true
            this.$router.push(`/rent/${this.productMoreDetails.id}`)
        },

        resetFilter() {
            this.reset++
        }
    },
    computed: {},
    created() {
        this.getRentCars()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pageProduct.scss';

.main-header {
    border-bottom: 2px solid #f2f3f6;
    padding-bottom: 10px;
    margin-bottom: 50px;
    &__box {
        display: flex;
        margin-top: 18px;
        // padding: 0 0 50px;
    }
    &__box-info {
        width: 460px;
    }
    &__questions {
        display: flex;
        flex-wrap: wrap;
        flex: 1 0;
        // row-gap: 35px;
        column-gap: 60px;
        width: 100%;
    }
    &__questions-accordion {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    &__box-tel {
        @include font(500, 14px, 140%);
        color: $red-dark;
        letter-spacing: 0.14px;
        margin-bottom: 10px;
    }
    &__box-text {
        @include font(400, 14px, 140%);
        letter-spacing: 0.14px;
        margin-bottom: 10px;
    }
    &__box-title {
        @include font(500, 20px, 0.2px);
        text-transform: uppercase;
        margin-bottom: 15px;
    }
}

.main-header {
    ::v-deep {
        .accordion-header {
            align-self: flex-end;
        }
    }

    ::v-deep {
        .accordion-header p {
            @include font(600, 14px, 140%);
            letter-spacing: 0.14px;
            text-transform: uppercase;
            &::after {
                content: '';
                background-image: url(@/assets/images/arrow-right-small.svg);
                background-repeat: no-repeat;
                background-position: center;
                display: inline-block;
                width: 8px;
                height: 13px;
                margin-left: 10px;
                transform: rotate(90deg);
                transition: transform 0.2s ease-in-out;
            }
        }
    }

    ::v-deep {
        .accordion-header--open p {
            &::after {
                transform: rotate(-90deg);
            }
        }
    }

    ::v-deep {
        .accordion-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
}

.main-header__questions-accordion {
    ::v-deep {
        .accordion-header {
            @include font(500, 14px, 140%);
            letter-spacing: 0.14px;
            &::after {
                content: '';
                background: url(@/assets/images/arrow-right-small-white.svg),
                    $black;
                filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.15));
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 35% auto;
                min-width: 18px;
                min-height: 18px;
            }
        }
    }

    ::v-deep {
        .accordion-body {
            @include font(400, 12px, 140%);
            letter-spacing: 0.12px;
        }
    }

    ::v-deep {
        .accordion-item {
            width: 400px;
        }
    }

    ::v-deep {
        .list-answer {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    ::v-deep {
        .item-answer {
            @include font(400, 12px, 140%);
            letter-spacing: 0.12px;
            list-style: inside;
        }
    }
}
</style>
