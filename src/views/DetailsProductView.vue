<template>
    <TheLoader v-if="loading" />
    <div v-else class="wrapper">
        <main v-if="product" class="main">
            <div class="main__box">
                <div class="main__box-gallery gallery">
                    <button @click="this.$router.push('/catalog')" class="gallery__btn-back button">
                        Вернуться в каталог
                    </button>
                    <img
                        :src="productImages[indexActiveImage]"
                        alt="photo car"
                        class="gallery__img"
                    />
                    <div class="gallery__magnifying">
                        <img
                            ref="magnifying"
                            @click="showModalSlider = true"
                            class="gallery__btn-magnifying"
                            src="@/assets/images/magnifying-glass-plus.svg"
                        />
                        <span class="gallery__overlay-magnifying"></span>
                    </div>
                    <BaseSlider
                        class="gallery__base-slider"
                        :images-number="productImages.length"
                        :primary-index-image="indexActiveImage + 1"
                        @current-index-image="indexActiveImage = $event"
                    />
                    <transition name="fade">
                        <ModalSlider
                            v-if="showModalSlider"
                            class="gallery__modal-slider"
                            :images="productImages"
                            :primary-image="indexActiveImage"
                            @close-modal="(showModalSlider = false), (indexActiveImage = $event)"
                        />
                    </transition>
                </div>
                <div class="detail-info">
                    <div class="detail-info__section">
                        <h5
                            class="detail-info__title"
                            :class="{
                                'detail-info__title--active': showSpecifications
                            }"
                            @click="(showSpecifications = true), (showEquipment = false)"
                        >
                            Технические характеристики
                        </h5>
                        <h5
                            class="detail-info__title"
                            :class="{
                                'detail-info__title--active': showEquipment
                            }"
                            @click="(showSpecifications = false), (showEquipment = true)"
                        >
                            Стандартное оборудование
                        </h5>
                    </div>
                    <Transition name="collapse">
                        <div
                            class="detail-info__specifications specifications"
                            v-show="showSpecifications"
                        >
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">ДВИГАТЕЛЬ</h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">Рабочий объем, куб. см</dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.volume }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальный крутящий момент, Н•м при об/мин
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.torque }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальная мощность, л. с. при об/мин
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.max_power }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Количество цилиндров / клапанов на цилиндр
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.cylinders }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">ХОДОВЫЕ КАЧЕСТВА</h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Максимальная скорость, км/ч
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.max_speed }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Время разгона 0–100 км/ч, сек
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.acceleration }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">РАСХОД ТОПЛИВА</h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Смешанный цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.mixed_cycle }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Загородный цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.urban_cycle }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Городской цикл, л/100 км
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.country_cycle }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">Выброс СО2, г/км</dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.pollution }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">ГАБАРИТЫ</h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">Длина, мм</dt>
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
                                        <dt class="specifications__term">Ширина, мм</dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.width }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">Клиренс, мм</dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.сlearance }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="specifications__item">
                                <h6 class="specifications__item-title">МАССА</h6>
                                <div class="specifications__item-box">
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Собственная масса (ЕС), кг
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.own_weight }}
                                        </dd>
                                    </dl>
                                    <dl class="specifications__list">
                                        <dt class="specifications__term">
                                            Допустимая полная масса, кг
                                        </dt>
                                        <dd class="specifications__definition">
                                            {{ product.specifications.gross_weight }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="collapse">
                        <div class="detail-info__equipment equipment" v-show="showEquipment">
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">
                                    Коробка передач и ходовая часть
                                </h6>
                                <ul class="equipment__list">
                                    <li class="equipment__list-item">
                                        {{ product.transmission }} коробка передач
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
                                        v-for="item in product.equipment.interior"
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
                                        v-for="item in product.equipment.info_communication"
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
                                        v-for="item in product.equipment.security_lighting_overview"
                                        :key="item"
                                        class="equipment__list-item"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div class="equipment__item">
                                <h6 class="equipment__item-title">Функциональное оборудование</h6>
                                <ul class="equipment__list">
                                    <li
                                        v-for="item in product.equipment.functional"
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
            </div>
            <div class="brief-info">
                <div class="brief-info__name" href="#">
                    <span class="brief-info__brand">{{ product.brand }}</span>
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
                            <td class="details-list__discr">{{ product.engine_power }} л.с.</td>
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
                <p class="brief-info__calculator-title">калькулятор</p>
                <BaseCalculator class="brief-info__calculator" :product-price="product.price" />
            </div>
        </main>
        <BaseFooterSimple />
    </div>
</template>

<script>
import photo1 from '@/assets/images/car-photo-1.jpg'
import photo2 from '@/assets/images/car-photo-2.jpg'
import photo3 from '@/assets/images/car-photo-3.jpg'
import photo4 from '@/assets/images/car-photo-4.jpg'
import photo5 from '@/assets/images/car-photo-5.jpg'

import BaseCalculator from '@/components/BaseCalculator.vue'
import BaseSlider from '@/components/UI/Slider/BaseSlider.vue'
import ModalSlider from '@/components/UI/Modal/ModalSlider.vue'
import ModalBooking from '@/components/UI/Modal/ModalBooking.vue'
import BaseFooterSimple from '@/components/BaseFooterSimple.vue'

import helpers from '@/helpers/global'
import { fetchData } from '@/utils/apiUtils'
import { useFilterDataStore } from '@/stores/FilterDataStore'

export default {
    name: 'DetailsProduct',
    components: {
        ModalSlider,
        ModalBooking,
        BaseFooterSimple,
        BaseCalculator,
        BaseSlider
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
            filterData: useFilterDataStore()
        }
    },
    computed: {
        modelName() {
            return helpers.removeBrandReplay(this.product.model, this.product.brand)
        }
    },
    methods: {
        async getLeasingCars() {
            this.loading = true

            this.leasingCar = await fetchData(
                'https://my.api.mockaroo.com/leasing_cars.json?key=a84cf050*',
                `${import.meta.env.BASE_URL}src/data/leasing_car.json`
            )

            if (typeof this.leasingCar === 'object') {
                this.actionsAfterGettingData()
            }

            this.loading = false
        },

        actionsAfterGettingData() {
            this.allProducts = helpers.getCarProducts(this.leasingCar)
            this.product = helpers.searchProduct(this.allProducts, 'id', this.$route.params.id)

            if (!this.product) {
                this.$router.push({ path: '/404' })
            }
        },

        navigateToCatalog(e) {
            this.filterData.similarModel = e
            this.$router.push('/catalog')
        }
    },
    created() {
        this.getLeasingCars()
        setTimeout(() => {
            this.$refs.magnifying.ondragstart = function () {
                return false
            }
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.main {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 680px 500px;
    align-items: start;
    &__box {
    }
    &__box-gallery {
        margin-bottom: 102px;
    }
}

.gallery {
    position: relative;
    width: 650px;
    height: 612px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    &__btn-back {
        @include font(600, 18px);
        color: $white;
        align-self: flex-start;

        &::before {
            content: url('@/assets/images/arrow-right-small-white.svg');
            display: inline-block;
            transform: rotate(180deg);
            color: $gray;
            margin-right: 4px;
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
    width: 650px;

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
        @include font(600, 16px);
        text-transform: uppercase;
        transition: all 0.2s ease-in-out;
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
        @include font(600, 24px);
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    &__list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__list-item {
        @include font(500, 16px);
    }
}
.specifications {
    display: flex;
    flex-direction: column;
    gap: 30px;
    &__definition {
        @include font(500, 16px);
    }
    &__item {
    }
    &__item-box {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__item-title {
        @include font(600, 24px);
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    &__list {
        display: flex;
        gap: 20px;
    }
    &__term {
        @include font(500, 16px);
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
        color: $gray;
        text-transform: uppercase;
    }
    &__calculator {
        width: 500px;
    }
    &__details {
        margin-bottom: 30px;
    }
    &__model {
        color: $red-dark;
    }
    &__more {
        @include font(500, 16px);
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
            @include font(700, 48px);
            text-transform: uppercase;
        }
    }
    &__payment {
        @include font(500, 16px);
        margin-bottom: 15px;
        & span {
            @include font(600, 16px);
        }
    }
    &__price {
        @include font(500, 16px);
        margin-bottom: 15px;
        & span {
            display: block;
            @include font(600, 32px);
            margin-top: 5px;
        }
    }
}

.details {
    &__title {
        @include font(600, 24px);
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
            @include font(500, 16px);
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
        &__copyright {
            flex-grow: 1;
        }
        &__offer {
            margin-right: 10px;
        }
    }
}
</style>
