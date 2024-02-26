<template>
    <div class="modal-bg modal-bg--theme-blur">
        <div class="modal">
            <div class="gallery">
                <button
                    @click="this.$emit('closeModal')"
                    class="gallery__btn-back button"
                >
                    назад
                </button>
                <img
                    :src="productImages[indexActiveImage]"
                    alt="photo car"
                    class="gallery__img"
                />
                <div class="gallery__magnifying">
                    <img
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
                        @close-modal="
                            (showModalSlider = false),
                                (indexActiveImage = $event)
                        "
                    />
                </transition>
            </div>
            <div class="modal-info">
                <p class="modal-info__name">
                    <span class="modal-info__brand">{{ product.brand }}</span>
                    <span class="modal-info__model">{{ modelName }}</span>
                </p>
                <p class="modal-info__plate-number">
                    {{ product.registration }}
                </p>
                <div class="modal-info__label-box">
                    <span
                        href="#"
                        class="modal-info__label"
                        :class="getClass(product.status)"
                    >
                        {{ product.status }}
                    </span>
                    <span
                        href="#"
                        class="modal-info__label modal-info__label--service"
                    >
                        {{ product.service }}
                    </span>
                </div>
                <p class="modal-info__payment">
                    <span class="modal-info__payment-rent">
                        {{ product.payment.toLocaleString() }} ₽
                        <span>/ день</span>
                    </span>
                </p>
                <p class="modal-info__price">
                    Депозит от
                    <span class="modal-info__price-rent">
                        {{ product.price.toLocaleString() }} ₽
                    </span>
                </p>
                <button
                    @click="showModalBooking = true"
                    class="modal-info__book button--size-m button button--color-red"
                >
                    Забронировать
                </button>
                <transition name="fade">
                    <ModalBooking
                        v-if="showModalBooking"
                        :name-car="`${product.brand} ${modelName}`"
                        @close-modal="showModalBooking = false"
                    />
                </transition>
                <div class="modal-info__details details">
                    <p class="details__title">Информация</p>
                    <table class="details-list">
                        <tr class="details-list__item">
                            <td class="details-list__term">Год</td>
                            <td class="details-list__discr">
                                {{ product.year }}
                            </td>
                        </tr>
                        <tr class="details-list__item">
                            <td class="details-list__term">КПП</td>
                            <td class="details-list__discr">
                                {{ product.transmission }}
                            </td>
                        </tr>
                        <tr class="details-list__item">
                            <td class="details-list__term">Пробег</td>
                            <td class="details-list__discr">
                                {{ product.mileage }} км
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import photo1 from '@/assets/images/car-photo-1.jpg';
import photo2 from '@/assets/images/car-photo-2.jpg';
import photo3 from '@/assets/images/car-photo-3.jpg';
import photo4 from '@/assets/images/car-photo-4.jpg';
import photo5 from '@/assets/images/car-photo-5.jpg';

import ModalSlider from '@/components/UI/Modal/ModalSlider.vue';
import ModalBooking from '@/components/UI/Modal/ModalBooking.vue';
import BaseSlider from '@/components/UI/Slider/BaseSlider.vue';

import CardMixin from '@/mixins/CardMixin';
import ModalMixin from '@/mixins/ModalMixin';

export default {
    name: 'ModalRentDetail',
    mixins: [CardMixin, ModalMixin],
    components: {
        ModalSlider,
        ModalBooking,
        BaseSlider,
    },
    data() {
        return {
            indexActiveImage: '',
            productImages: [photo1, photo2, photo3, photo4, photo5],
            showModalSlider: false,
            showModalBooking: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.modal-info {
}
.details {
    &__title {
        @include font(500, 24px);
        text-transform: uppercase;
        margin-bottom: 25px;
    }
}
.details-list {
    display: table;

    &__discr {
    }
    &__item {
        & * {
            @include font(500, 16px);
            padding-bottom: 15px;
        }
    }
    &__term {
        padding-right: 20px;
        color: $gray-dark;
    }
}
.modal {
    display: flex;
}

.gallery {
    position: relative;
    width: 690px;
    height: 656px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        width: 690px;
        height: 656px;
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
        transition: opacity 0.2s ease-in-out;
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
        transition: opacity 0.2s ease-in-out;
    }
    &__modal-slider {
    }
    &__slider {
    }
}
.modal-info {
    background: $white;
    padding: 35px 60px;
    width: 520px;
    height: 656px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &__book {
        margin-bottom: 40px;
    }
    &__brand {
        margin-right: 8px;
    }
    &__details {
    }
    &__label {
        padding: 5px 15px;
        height: 29px;
        border-radius: 2px;
        background: $gray-light;
        &--service {
        }
    }
    &__label-box {
        display: flex;
        gap: 10px;
        margin-bottom: 60px;
    }
    &__label--free {
        background: rgba(64, 129, 4, 0.2);
    }
    &__label--busy {
        color: $gray-dark;
    }
    &__model {
        color: $red-dark;
    }
    &__name {
        margin-bottom: 10px;
        & * {
            @include font(600, 40px);
            text-transform: uppercase;
        }
    }
    &__payment {
        margin-bottom: 15px;
        & * {
            @include font(600, 24px);
        }
    }
    &__payment-rent {
        @include font(600, 32px);
    }
    &__plate-number {
        @include font(500, 24px);
        text-transform: uppercase;
        color: $gray-dark;
        margin-bottom: 20px;
    }
    &__price {
        @include font(500, 16px);
        margin-bottom: 40px;
    }
    &__price-rent {
        @include font(600, 16px);
    }
}
</style>
