<template>
    <TheLoader v-if="loading" />
    <div v-else class="wrapper">
        <main v-if="product" class="main">
            <div class="main__box">
                <div class="brief-info">
                    <BaseSlider
                        class="brief-info__base-slider"
                        :images-number="productImages.length"
                        :primary-index-image="indexActiveImage + 1"
                        @current-index-image="indexActiveImage = $event"
                    />
                    <div class="brief-info__name" href="#">
                        <span class="brief-info__brand">
                            {{ product.brand }}
                        </span>
                        <span class="brief-info__model">{{ modelName }}</span>
                    </div>
                    <div class="brief-info__price">
                        Цена
                        <span>{{ product.price.toLocaleString() }} ₽</span>
                    </div>
                    <div class="brief-info__payment">
                        Минимальный платёж от
                        <span>{{ product.payment.toLocaleString() }} ₽</span>
                    </div>
                    <a
                        @click.prevent="navigateToCatalog(product.model)"
                        class="brief-info__more"
                        to="/catalog"
                    >
                        Посмотреть похожие модели
                    </a>
                    <div class="brief-info__book">
                        <button
                            @click="showModal = true"
                            class="card__book button--size-m button button--color-red"
                        >
                            Забронировать
                        </button>
                        <Teleport to="body">
                            <transition name="fade">
                                <ModalBooking
                                    v-if="showModal"
                                    :name-car="`${product.brand} ${modelName}`"
                                    @close-modal="showModal = false"
                                />
                            </transition>
                        </Teleport>
                    </div>
                    <div class="brief-info__details details">
                        <p class="details__title">Информация</p>
                        <table class="details-list">
                            <tr class="details-list__item">
                                <td class="details-list__term">Объём</td>
                                <td class="details-list__discr">
                                    {{ product.engine_displacement }} л.
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Мощность</td>
                                <td class="details-list__discr">
                                    {{ product.engine_power }} л.с.
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Топливо</td>
                                <td class="details-list__discr">
                                    {{ product.fuel }}
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Коробка</td>
                                <td class="details-list__discr">
                                    {{ product.transmission }}
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Привод</td>
                                <td class="details-list__discr">
                                    {{ product.drive }}
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Кузов</td>
                                <td class="details-list__discr">
                                    {{ product.body }}
                                </td>
                            </tr>
                            <tr class="details-list__item">
                                <td class="details-list__term">Год</td>
                                <td class="details-list__discr">
                                    {{ product.year }}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="brief-info__calculator-wrapper">
                        <p class="brief-info__calculator-title">калькулятор</p>
                        <BaseCalculator
                            class="brief-info__calculator"
                            :product-price="product.price"
                        />
                    </div>
                </div>
                <div class="main__box-gallery gallery">
                    <button
                        @click="this.$router.push('/catalog')"
                        class="gallery__btn-back button"
                    >
                        <span>Вернуться в каталог</span>
                    </button>
                    <img
                        :src="productImages[indexActiveImage]"
                        alt="photo car"
                        class="gallery__img"
                    />
                    <div
                        @click="showModalSlider = true"
                        class="gallery__magnifying"
                    ></div>
                    <BaseSlider
                        class="gallery__base-slider"
                        :images-number="productImages.length"
                        :primary-index-image="indexActiveImage + 1"
                        @current-index-image="indexActiveImage = $event"
                    />
                    <Teleport to="body">
                        <transition name="fade">
                            <ModalSlider
                                v-if="showModalSlider"
                                class="gallery__modal-slider"
                                :images="productImages"
                                :primary-image="indexActiveImage"
                                @close-modal="
                                    (showModalSlider = false),
                                        (indexActiveImage = $event)
                                "
                            />
                        </transition>
                    </Teleport>
                </div>
                <div class="detail-info">
                    <div class="detail-info__section">
                        <h5
                            class="detail-info__title"
                            :class="{
                                'detail-info__title--active':
                                    showSpecifications,
                            }"
                            @click="
                                (showSpecifications = true),
                                    (showEquipment = false)
                            "
                        >
                            <span class="detail-info__title--long">
                                Технические характеристики
                            </span>
                            <span class="detail-info__title--short">
                                Тех. характеристики
                            </span>
                        </h5>
                        <h5
                            class="detail-info__title"
                            :class="{
                                'detail-info__title--active': showEquipment,
                            }"
                            @click="
                                (showSpecifications = false),
                                    (showEquipment = true)
                            "
                        >
                            <span class="detail-info__title--long">
                                Стандартное оборудование
                            </span>
                            <span class="detail-info__title--short">
                                Комплектация
                            </span>
                        </h5>
                    </div>
                    <Transition name="collapse">
                        <div
                            class="detail-info__specifications specifications"
                            v-show="showSpecifications"
                        >
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">
                                    ДВИГАТЕЛЬ
                                </h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Рабочий объем, куб. см
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.volume }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальный крутящий момент, Н•м
                                            при об/мин
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.torque }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальная мощность, л. с. при
                                            об/мин
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications.max_power
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Количество цилиндров / клапанов на
                                            цилиндр
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications.cylinders
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">
                                    ХОДОВЫЕ КАЧЕСТВА
                                </h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальная скорость, км/ч
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications.max_speed
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Время разгона 0–100 км/ч, сек
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .acceleration
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">
                                    РАСХОД ТОПЛИВА
                                </h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Смешанный цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .mixed_cycle
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Загородный цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .urban_cycle
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Городской цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .country_cycle
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Выброс СО2, г/км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications.pollution
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">
                                    ГАБАРИТЫ
                                </h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Длина, мм
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.length }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Высота, мм (вместе с антенной)
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.height }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Ширина, мм
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.width }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Клиренс, мм
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications.сlearance
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">
                                    МАССА
                                </h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Собственная масса (ЕС), кг
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .own_weight
                                            }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Допустимая полная масса, кг
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{
                                                product.specifications
                                                    .gross_weight
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="collapse">
                        <div
                            class="detail-info__equipment equipment"
                            v-show="showEquipment"
                        >
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">
                                    Коробка передач и ходовая часть
                                </h6>
                                <ul class="equipment__list">
                                    <li class="equipment__list-item">
                                        {{ product.transmission }} коробка
                                        передач
                                        {{ product.equipment.transmission }}
                                    </li>
                                    <li class="equipment__list-item">
                                        Система
                                        {{ product.equipment.chassis }}
                                    </li>
                                </ul>
                            </div>
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">Интерьер</h6>
                                <ul class="equipment__list">
                                    <li
                                        v-for="item in product.equipment
                                            .interior"
                                        :key="item"
                                        class="equipment__list-item"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">
                                    Системы информации и коммуникации
                                </h6>
                                <ul class="equipment__list">
                                    <li
                                        v-for="item in product.equipment
                                            .info_communication"
                                        :key="item"
                                        class="equipment__list-item"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">
                                    Безопасность, освещение и обзор
                                </h6>
                                <ul class="equipment__list">
                                    <li
                                        v-for="item in product.equipment
                                            .security_lighting_overview"
                                        :key="item"
                                        class="equipment__list-item"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">
                                    Функциональное оборудование
                                </h6>
                                <ul class="equipment__list">
                                    <li
                                        v-for="item in product.equipment
                                            .functional"
                                        :key="item"
                                        class="equipment__list-item"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Transition>
                </div>
                <button
                    @click="showModal = true"
                    class="main__box-book button--size-m button button--color-red"
                >
                    Забронировать
                </button>
            </div>
        </main>
        <BaseFooterSimple />
    </div>
</template>

<script>
import photo1 from '@/assets/images/car-photo-1.jpg';
import photo2 from '@/assets/images/car-photo-2.jpg';
import photo3 from '@/assets/images/car-photo-3.jpg';
import photo4 from '@/assets/images/car-photo-4.jpg';
import photo5 from '@/assets/images/car-photo-5.jpg';

import BaseCalculator from '@/components/BaseCalculator.vue';
import BaseSlider from '@/components/UI/Slider/BaseSlider.vue';
import ModalSlider from '@/components/UI/Modal/ModalSlider.vue';
import ModalBooking from '@/components/UI/Modal/ModalBooking.vue';
import BaseFooterSimple from '@/components/BaseFooterSimple.vue';

import helpers from '@/helpers/global';
import { fetchData } from '@/utils/apiUtils';
import { useFilterDataStore } from '@/stores/FilterDataStore';

export default {
    name: 'DetailsProduct',
    components: {
        ModalSlider,
        ModalBooking,
        BaseFooterSimple,
        BaseCalculator,
        BaseSlider,
    },
    props: {},
    data() {
        return {
            leasingCar: '',
            loading: false,
            product: null,
            allProducts: '',
            showModal: false,
            indexActiveImage: '',
            productImages: [photo1, photo2, photo3, photo4, photo5],
            showModalSlider: false,
            valueDownPayment: '',
            valueTermPayment: '',
            percentDownPayment: 20,
            termPayment: 24,
            showSpecifications: true,
            showEquipment: false,
            filterData: useFilterDataStore(),
        };
    },
    computed: {
        modelName() {
            return helpers.removeBrandReplay(
                this.product.model,
                this.product.brand,
            );
        },
    },
    methods: {
        async getLeasingCars() {
            this.loading = true;

            const path = import.meta.env.DEV
                ? `public/data/leasing_car.json`
                : `data/leasing_car.json`;

            this.leasingCar = await fetchData(
                'https://my.api.mockaroo.com/leasing_cars.json?key=a84cf050*',
                `${import.meta.env.BASE_URL}${path}`,
            );

            if (typeof this.leasingCar === 'object') {
                this.actionsAfterGettingData();
            }

            this.loading = false;
        },

        actionsAfterGettingData() {
            this.allProducts = helpers.getCarProducts(this.leasingCar);
            this.product = helpers.searchProduct(
                this.allProducts,
                'id',
                this.$route.params.id,
            );

            if (!this.product) {
                this.$router.push({ path: '/404' });
            }
        },

        navigateToCatalog(e) {
            this.filterData.similarModel = e;
            this.$router.push('/catalog');
        },
    },
    created() {
        this.getLeasingCars();
    },
    mounted() {
        let btnTop = document.querySelector('.scroll-top');
        btnTop.classList.add('scroll-top--use');
    },
    unmounted() {
        let btnTop = document.querySelector('.scroll-top');
        btnTop.classList.remove('scroll-top--use');
    },
};
</script>

<style lang="scss" scoped>
.main {
    padding: 20px 0 40px;
    &__box {
        display: grid;
        grid-template-columns: 50.4% clamp(375px, 35.7%, 500px);
        column-gap: 4.3%;
    }
    &__box-gallery {
        order: 1;
    }

    &__box-book {
        display: none;
    }
}

.gallery {
    position: relative;
    max-width: 650px;
    height: 612px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    &__btn-back {
        & * {
            @include font(600, clamp(0.875rem, 0.817rem + 0.256vw, 1.125rem));
            color: $white;
            align-self: center;
        }
        align-self: flex-start;
        display: flex;
        align-items: center;

        &::before {
            content: url('@/assets/images/arrow-right-small-white.svg');
            display: inline-block;
            transform: rotate(180deg);
            color: $gray;
            margin-right: 8px;
            transition: transform 0.2s ease-in-out;
        }

        &:hover::before {
            transform: translateX(-10px) rotate(180deg);
        }
    }
    &__img {
        position: absolute;
        width: 650px;
        height: 612px;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        object-fit: cover;
    }
    &__magnifying {
        position: relative;
        align-self: center;
        display: flex;
        justify-content: center;
        width: 70%;
        height: 70%;
        cursor: pointer;
    }
    &__btn-magnifying {
        padding: 100px;
        opacity: 0;
        cursor: pointer;
        transform: scale(2);
        transition: all 0.2s ease-in-out;

        &:hover,
        &:hover + .gallery__overlay-magnifying {
            opacity: 1;
        }
    }
    &__overlay-magnifying {
        background-color: $black;
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 44%;
        top: 44%;
        opacity: 0;
        border-radius: 50%;
        z-index: -1;
        transition: all 0.2s ease-in-out;
    }
    &__modal-slider {
    }
    &__slider {
    }
}

.detail-info {
    max-width: 650px;
    order: 3;
    margin-top: -80px;

    &__equipment {
    }
    &__section {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
    }
    &__specifications {
    }
    &__title {
        & * {
            @include font(600, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
            text-transform: uppercase;
            transition: all 0.2s ease-in-out;
        }

        &--short {
            display: none;
        }

        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            margin-top: 5px;
            border-radius: 5px;
            background-color: $gray-light;
            transition: all 0.2s ease-in-out;
        }
    }
    &__title--active {
        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            margin-top: 5px;
            border-radius: 5px;
            background-color: $red-dark;
            transition: all 0.2s ease-in-out;
        }
    }
}

.equipment {
    display: flex;
    flex-direction: column;
    gap: 30px;
    &__item {
    }
    &__item-title {
        @include font(600, clamp(1.125rem, 1.038rem + 0.385vw, 1.5rem));
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    &__list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__list-item {
        @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
    }
}
.specifications {
    display: flex;
    flex-direction: column;
    gap: 30px;
    &__definition {
        @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
    }
    &__item {
    }
    &__item-box {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__item-title {
        @include font(600, clamp(1.125rem, 1.038rem + 0.385vw, 1.5rem));
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    &__list {
        display: flex;
        gap: 20px;
    }
    &__term {
        @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
        color: $gray-dark;
        max-width: 430px;
        overflow: hidden;
        white-space: nowrap;
        &::after {
            content: '..................................................................................................................';
        }
    }
}

.brief-info {
    position: sticky;
    top: 100px;
    z-index: 1;
    order: 2;
    max-width: 500px;

    &__base-slider {
        display: none;
    }

    &__book {
        margin-bottom: 20px;
    }
    &__brand {
        color: $black;
        margin-right: 10px;
    }
    &__calculator-title {
        @include font(600, 18px);
        margin-bottom: 5px;
        text-transform: uppercase;
    }
    &__calculator {
        width: 100%;
    }
    &__details {
        margin-bottom: 30px;
    }
    &__model {
        color: $red-dark;
    }
    &__more {
        @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &::after {
            content: '';
            background-image: url(@/assets/images/arrow-right-small.svg);
            background-repeat: no-repeat;
            background-position: center;
            display: inline-block;
            width: 8px;
            height: 13px;
            margin-left: 10px;
            transform: translateX(0px);
            transition: transform 0.2s ease-in-out;
        }

        &:hover::after {
            transform: translateX(5px);
        }

        &:hover {
            cursor: pointer;
        }
    }
    &__name {
        margin-bottom: 15px;
        & * {
            @include font(700, clamp(2rem, 1.769rem + 1.026vw, 3rem));
            text-transform: uppercase;
        }
    }
    &__payment {
        @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        margin-bottom: 15px;
        & span {
            @include font(600, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        }
    }
    &__price {
        @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        margin-bottom: 15px;
        & span {
            display: block;
            @include font(600, clamp(1.5rem, 1.385rem + 0.513vw, 2rem));
            margin-top: 5px;
        }
    }
}

.details {
    &__title {
        @include font(600, clamp(1.125rem, 1.038rem + 0.385vw, 1.5rem));
        text-transform: uppercase;
        margin-bottom: 20px;
    }
}
.details-list {
    &__discr {
        padding-bottom: 10px;
    }
    &__item {
        * {
            @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        }
    }
    &__term {
        padding-right: 10px;
        padding-bottom: 10px;
        color: $gray-dark;
    }
}

::v-deep {
    .footer-simple {
        padding-bottom: 20px;
        &__copyright {
            flex-grow: 1;
        }
        &__offer {
            margin-right: 10px;
        }
    }
}

@include media-query($xl) {
    .main {
        padding: 16px 0 40px;
    }
    .detail-info {
        &__title {
            &--short {
                display: block;
            }
            &--long {
                display: none;
            }
        }
    }
}

@include media-query($lg) {
    .main {
        max-width: 100%;
        &__box {
            grid-template-columns: minmax(auto, 650px);
            row-gap: 4vh;
        }
        &__box-gallery {
        }
    }

    .brief-info {
        position: relative;
        max-width: none;
        top: 0;
        &__calculator-wrapper {
        }
    }

    .detail-info {
        margin-top: 0;
    }
}

@include media-query($sm, $md) {
    .main {
        padding: 0px 0 40px;
        &__box {
            grid-template-columns: 100%;
        }
    }
    .gallery {
        height: 40vh;
        margin: 0 -16px;

        &__img {
            width: 100%;
            height: 100%;
        }

        &__btn-back {
            & * {
                display: none;
            }

            &::before {
                content: url('@/assets/images/arrow-right-white.svg');
                display: inline-block;
                transform: rotate(180deg) scale(1.2);
                margin-right: 8px;
            }
        }
    }

    .specifications {
        &__list {
            justify-content: space-between;
            padding: 6px 0;
            align-items: center;
        }
        &__list:nth-child(even) {
            margin: 0 -16px;
            padding: 6px 16px;
            background: #f2f3f6;
        }
        &__list:nth-child(odd) {
            padding: 0;
        }
        &__term {
            max-width: 200px;
            white-space: normal;
            &::after {
                content: '';
            }
        }
        &__item-box {
            gap: 8px;
        }
        &__item-title {
            margin-bottom: 12px;
        }
    }

    .equipment {
        &__item-title {
            margin-bottom: 12px;
        }
        &__list {
            gap: 8px;
        }
        &__list-item:nth-child(even) {
            margin: 0 -16px;
            padding: 6px 16px;
            background: #f2f3f6;
        }
    }
}

@include media-query($xs, $sm) {
    .main {
        &__box-book {
            display: block;
            position: sticky;
            bottom: 20px;
            z-index: 99;
            background: #ffffff;
            order: 3;
            width: 100%;
            margin-top: 30px;
        }
    }
    .gallery {
        &__base-slider {
            display: none;
        }
        &__magnifying {
            width: 100%;
            height: 100%;
        }
    }

    .brief-info {
        &__base-slider {
            display: flex;
            margin: -2vh 0 4vh;
        }

        &__book {
            display: none;
        }

        &__more {
            margin-bottom: 30px;
        }

        &__payment {
            margin-bottom: 12px;
        }
        &__price {
            margin-bottom: 12px;
        }
        &__calculator-wrapper {
            margin: 0 -16px;
            padding: 24px 16px;
            box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.05);
        }
    }

    .detail-info {
        &__section {
            margin-bottom: 24px;
        }
    }

    .equipment,
    .specifications {
        gap: 24px;
    }

    ::v-deep {
        .slider-prev,
        .slider-next,
        .slider-dots__item--active {
            filter: brightness(10%);
        }

        .slider-prev {
            transform: scale(0.5) rotate(180deg);
        }

        .slider-next {
            transform: scale(0.5);
        }

        .slider-dots {
            &__item {
                width: 24px;
                height: 2px;
            }
        }

        .footer-simple {
            &__offer,
            &__privacy-police {
                display: none;
            }
        }
    }
}
</style>

<style>
.scroll-top--use {
    transform: translate(-16px, -126px) !important;
}
</style>
