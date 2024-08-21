<template>
    <div class="modal-bg modal-bg--theme-blur">
        <div class="modal">
            <div class="modal__header">
                <img
                    @click="this.$emit('closeModal')"
                    class="modal__btn-back"
                    src="@/assets/images/arrow-right-white.svg"
                    alt="arrow back"
                />
                <img
                    class="modal__logo"
                    src="@/assets/images/logo-black.svg"
                    alt="arrow back"
                />
            </div>
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
                <BaseSlider
                    class="modal-info__base-slider"
                    :images-number="productImages.length"
                    :primary-index-image="indexActiveImage + 1"
                    @current-index-image="indexActiveImage = $event"
                />
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
.details {
    &__title {
        @include font(500, clamp(1.125rem, 1.038rem + 0.385vw, 1.5rem));
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
            @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
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
    &__header {
        display: none;
    }
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
        @include font(600, clamp(1rem, 0.971rem + 0.128vw, 1.125rem));
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
        display: flex;
        justify-content: center;
        width: 70%;
        height: 70%;
        cursor: pointer;
    }
    &__modal-slider {
    }
    &__slider {
    }
}
.modal-info {
    background: $white;
    padding: 35px 60px;
    width: 510px;
    height: 656px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &__base-slider {
        display: none;
    }
    &__book {
        margin-bottom: 40px;
    }
    &__brand {
        margin-right: 8px;
    }
    &__details {
    }
    &__label {
        padding: 6px 15px;
        height: 29px;
        border-radius: 2px;
        background: $gray-light;
        @include font(400, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
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
            @include font(600, clamp(2rem, 1.885rem + 0.513vw, 2.5rem));
            text-transform: uppercase;
        }
    }
    &__payment {
        margin-bottom: 15px;
        & * {
            @include font(600, clamp(1rem, 0.885rem + 0.513vw, 1.5rem));
        }
    }
    &__payment-rent {
        @include font(600, clamp(1.5rem, 1.385rem + 0.513vw, 2rem));
    }
    &__plate-number {
        @include font(500, clamp(1rem, 0.885rem + 0.513vw, 1.5rem));
        text-transform: uppercase;
        color: $gray-dark;
        margin-bottom: 20px;
    }
    &__price {
        @include font(500, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
        margin-bottom: 40px;
    }
    &__price-rent {
        @include font(600, clamp(0.875rem, 0.846rem + 0.128vw, 1rem));
    }
}
.card {
    &__label--free {
        background: rgba(64, 129, 4, 0.2);
    }

    &__label--busy {
        color: $gray-dark;
    }
}

@include media-query($xl, 656px) {
    .modal {
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
    }

    .gallery {
        min-height: 40%;
        &__img {
            width: 100%;
            height: 100%;
        }
    }

    .modal-info {
        height: auto;
        width: 100%;
        padding: 35px;
        justify-content: space-between;
    }
}

@include media-query($md) {
    .modal {
        width: 100vw;
    }

    .gallery {
        width: 100%;
    }
}

@include media-query($xs, 600px) {
    .modal {
        &__header {
            display: flex;
            align-items: center;
            padding: 16px;
            background: $white;
        }
        &__btn-back {
            width: 20px;
            height: 20px;
            transform: rotate(180deg);
            filter: brightness(10%);
        }
        &__logo {
            height: 24px;
            padding-right: 20px;
            margin: 0 auto;
        }
    }
    .gallery {
        justify-content: center;
        &__base-slider {
            display: none;
        }
        &__btn-back {
            display: none;
        }
        &__magnifying {
            width: 100%;
            height: 100%;
        }
    }

    .modal-info {
        padding: 16px;
        &__base-slider {
            display: flex;
            margin-bottom: 20px;
        }
        &__book {
            position: sticky;
            bottom: 20px;
            z-index: 99;
            background: $white;
            order: 1;
            width: 100%;
            margin-bottom: 0;
        }
        &__details {
            margin-bottom: 29px;
        }
        &__label-box {
            margin-bottom: 20px;
        }
        &__name {
            margin-bottom: 8px;
        }
        &__plate-number {
            margin-bottom: 15px;
        }
        &__payment {
            margin-bottom: 12px;
        }
        &__price {
            margin-bottom: 32px;
        }
    }

    .details {
        &__title {
            margin-bottom: 16px;
        }
    }

    .details-list {
        &__term {
            padding-bottom: 12px;
        }
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
    }
}
</style>
