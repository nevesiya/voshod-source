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
                <div
                    :class="{
                        'main-sidebar--open': isOpenSlidingSidebar,
                    }"
                    class="main-sidebar"
                >
                    <div class="main-sidebar__header">
                        <img
                            @click="
                                isOpenSlidingSidebar = !isOpenSlidingSidebar
                            "
                            src="@/assets/images/arrow-right-black.svg"
                            alt="arrow back"
                            class="main-sidebar__header-close"
                        />
                    </div>
                    <button
                        :disabled="disabledResetButton"
                        @click="resetFilter"
                        class="button button--reset button--color-red button--size-xs"
                    >
                        Сбросить фильтр
                    </button>
                    <FilterButton
                        class="main-sidebar__service"
                        :reset-selected="reset"
                        @selected-items="selectService = $event"
                        name="service"
                        :options="service"
                    />
                    <filter-range
                        title-filter="Цена"
                        value-type="price"
                        :value-min="minPrice"
                        :value-max="maxPrice"
                        :reset-selected="reset"
                        :open="!loading"
                        @selected-min="selectMinPrice = $event"
                        @selected-max="selectMaxPrice = $event"
                    ></filter-range>
                    <filter-checkbox
                        title-filter="Марка"
                        :id="'brand'"
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
                        :id="'body'"
                        :reset-selected="reset"
                        :options="body"
                        :open="!loading"
                        @selected-items="selectBody = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Коробка передач"
                        :id="'transmission'"
                        :reset-selected="reset"
                        :options="transmission"
                        :open="!loading"
                        @selected-items="selectTransmission = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Привод"
                        :id="'drive'"
                        :reset-selected="reset"
                        :options="drive"
                        :open="!loading"
                        @selected-items="selectDrive = $event"
                    ></filter-checkbox>
                    <filter-checkbox
                        title-filter="Вид топлива"
                        :id="'fuel'"
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
                                class="filter-group__service"
                                :reset-selected="reset"
                                @selected-items="selectService = $event"
                                name="service"
                                :options="service"
                            />
                            <FilterButton
                                class="filter-group__status"
                                :reset-selected="reset"
                                @selected-items="selectStatus = $event"
                                name="status"
                                :options="status"
                            />
                            <img
                                @click="
                                    isOpenSlidingSidebar = !isOpenSlidingSidebar
                                "
                                class="filter-group__btn-filter"
                                src="@/assets/images/icon-filter.svg"
                                alt=""
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
                                        pageEnd,
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
import { defineAsyncComponent } from 'vue';
import BaseQuestion from '@/components/BaseQuestion.vue';
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue';
import CardRent from '@/components/UI/Card/CardRent.vue';
import PageProductMixin from '@/mixins/PageProductMixin';
import helpers from '@/helpers/global';
import { fetchData } from '@/utils/apiUtils';

export default {
    components: {
        BaseQuestion,
        ModalRentDetail: defineAsyncComponent(
            () => import('@/components/UI/Modal/ModalRentDetail.vue'),
        ),
        CardRent,
        BaseAccordion,
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
                        'внести оплату (залог + стоимость аренды)',
                    ],
                },
                {
                    question: 'Требования к водителю',
                    answer: [
                        'водительское удостоверение',
                        'паспорт',
                        'стаж вождения от 3-х лет',
                        'постоянная или временная регистрация сроком не менее 6 месяцев на территории РФ',
                    ],
                },
                {
                    question: 'Условия аренды',
                    answer: [
                        'минимальное время проката от 2-х суток (максимальное не ограничено)',
                        'автомобили технически исправны и не старше 3-х лет',
                        'все автомобили застрахованы (ОСАГО, КАСКО)',
                        'автомобили чистые и заправлены',
                    ],
                },
                {
                    question: 'Условия возврата ',
                    answer: [
                        'возврат автомобиля осуществляется в период с 10 до 11 утра',
                        'автомобили технически исправнсообщить о сдаче автомобиля необходимо не позднее чем за 2-е суток и не старше 3-х лет',
                        'втомобиль должен быть чистым и заправлен',
                    ],
                },
            ],
            rentCar: '',
            productMoreDetails: '',
            showModalRentMore: false,
        };
    },
    methods: {
        async getRentCars() {
            this.loading = true;

            const path = import.meta.env.DEV
                ? `public/data/rent_car.json`
                : `data/rent_car.json`;

            this.rentCar = await fetchData(
                'https://my.api.mockaroo.com/rent_cars.json?key=a84cf050*',
                `${import.meta.env.BASE_URL}${path}`,
            );

            if (typeof this.rentCar === 'object') {
                this.actionsAfterGettingData();
            }

            this.loading = false;
        },

        actionsAfterGettingData() {
            this.product = helpers.getCarProducts(this.rentCar);
            this.getDataFilter();
            this.checkOpenDetailsProduct();
        },

        getDataFilter() {
            this.model = helpers.getCarModels(this.product);
            this.brand = helpers.getUniqueElements(this.product, 'brand');
            this.status = helpers.getUniqueElements(this.product, 'status');
            this.drive = helpers.getUniqueElements(this.product, 'drive');
            this.fuel = helpers.getUniqueElements(this.product, 'fuel');
            this.body = helpers.getUniqueElements(this.product, 'body');
            this.transmission = helpers.getUniqueElements(
                this.product,
                'transmission',
            );
            this.service = helpers.getUniqueElements(this.product, 'service');
            [this.minPrice, this.maxPrice] = helpers.findMinMaxDigits(
                this.product,
                'price',
            );
            [this.minYear, this.maxYear] = helpers.findMinMaxDigits(
                this.product,
                'year',
            );
        },

        checkOpenDetailsProduct() {
            if (this.$route.params.id) {
                this.product = helpers.getCarProducts(this.rentCar);
                let currentProduct = helpers.searchProduct(
                    this.product,
                    'id',
                    this.$route.params.id,
                );

                currentProduct
                    ? this.openDetailsProductPage(currentProduct)
                    : this.$router.push({ path: '/404' });
            }
        },

        openDetailsProductPage(e) {
            this.productMoreDetails = e;
            this.showModalRentMore = true;
            this.$router.push(`/rent/${this.productMoreDetails.id}`);
        },

        resetFilter() {
            this.reset++;

            setTimeout(() => {
                this.$router.push({
                    query: {},
                });
            });
        },
    },
    computed: {},
    created() {
        this.getRentCars();
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pageProduct.scss';

.main-header {
    border-bottom: 2px solid #f2f3f6;
    padding-bottom: 10px;
    @include adaptive-value('margin-bottom', 50, 20, 0, 1400);
    &__box {
        display: flex;
        margin-top: 18px;
        @include adaptive-value('column-gap', 40, 20, 0, 1400);
    }
    &__box-info {
        @include adaptive-value('max-width', 460, 360, 0, 1400);
        &::before {
            content: '';
            display: block;
            float: left;
            height: 100%;
            background: $red-dark;
            margin-right: 16px;
            @include adaptive-value('width', 6, 3, 0, 1400);
        }
    }
    &__questions {
        display: flex;
        flex-wrap: wrap;
        @include adaptive-value('row-gap', 20, 10, 0, 1400);
        @include adaptive-value('column-gap', 60, 20, 0, 1400);
        width: 100%;
    }
    &__questions-accordion {
        display: flex;
        flex-direction: column;
        @include adaptive-value('row-gap', 20, 10, 0, 1400);
    }
    &__box-tel {
        @include font(500, clamp(0.625rem, 0.567rem + 0.256vw, 0.875rem), 140%);
        color: $red-dark;
        letter-spacing: 0.14px;
        margin-bottom: 10px;
    }
    &__box-text {
        @include font(400, clamp(0.625rem, 0.567rem + 0.256vw, 0.875rem), 140%);
        letter-spacing: 0.14px;
        @include adaptive-value('margin-bottom', 10, 8, 0, 1400);
    }
    &__box-title {
        @include font(500, clamp(1rem, 0.942rem + 0.256vw, 1.25rem));
        text-transform: uppercase;
        @include adaptive-value('margin-bottom', 15, 8, 0, 1400);
    }
}

.main-header {
    ::v-deep {
        .accordion-header {
            align-self: flex-end;
        }
        .accordion-header p {
            @include font(600, clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem));
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
        .accordion-header--open p {
            &::after {
                transform: rotate(-90deg);
            }
        }
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
            @include font(
                500,
                clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem),
                140%
            );
            letter-spacing: 0.14px;
        }
        .accordion-body {
            @include font(400, 12px, 140%);
            letter-spacing: 0.12px;
        }
        .accordion-item {
            max-width: 400px;
        }
        .list-answer {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .item-answer {
            @include font(400, 12px, 140%);
            letter-spacing: 0.12px;
            list-style: inside;
        }
    }
}

@include media-query($xxl) {
    .main-header {
        ::v-deep {
            .accordion-header {
                align-self: start;
            }
        }
    }
}

@include media-query($md) {
    .main-header {
        &__box {
            flex-wrap: wrap;
            gap: 32px;
        }
    }
}
</style>
