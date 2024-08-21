<template>
    <div class="modal-bg modal-bg--theme-blur">
        <transition name="slide-fade">
            <template v-if="content">
                <div class="modal">
                    <div class="modal-promo">
                        <div class="modal-promo__header">
                            <img
                                @click="this.$emit('closeModal')"
                                class="modal-promo__btn-back"
                                src="@/assets/images/arrow-right-white.svg"
                                alt="arrow back"
                            />
                            <img
                                class="modal-promo__logo"
                                src="@/assets/images/logo-white.svg"
                                alt="arrow back"
                            />
                        </div>
                        <img
                            src="@/assets/images/modal-image.jpg"
                            alt="photo vehicle interior"
                            class="modal-promo__img"
                        />
                        <div class="modal-promo__text">
                            <h3 class="modal-promo__title">
                                Доступные
                                <br />
                                автомобили
                            </h3>
                            <p class="modal-promo__slogan">
                                С нами просто.
                                <br />
                                Индивидуальные решения для вас.
                            </p>
                        </div>
                    </div>
                    <div class="modal-content">
                        <button
                            v-if="showBtnBack"
                            @click="this.$emit('closeModal')"
                            class="modal-content__btn-back"
                            type="button"
                        >
                            Вернуться
                        </button>
                        <div class="modal-content__body">
                            <h6 class="modal-content__title">
                                {{ title }}
                                <span class="modal-content__title-minor">
                                    {{ titleMinor }}
                                </span>
                            </h6>
                            <p
                                :class="[
                                    'modal-content__text',
                                    {
                                        'modal-content__text--theme-line':
                                            !showBtnBack,
                                    },
                                ]"
                            >
                                {{ text }}
                            </p>
                            <slot v-if="showForm" name="form"></slot>
                        </div>
                        <button
                            v-if="!showBtnBack"
                            @click="this.$emit('closeModal')"
                            class="modal-content__btn-close button--color-red button--size-s"
                            type="button"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </template>
        </transition>
    </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin';

export default {
    name: 'BaseModal',
    mixins: [ModalMixin],
    props: {
        title: String,
        titleMinor: String,
        text: String,
        showForm: {
            type: Boolean,
            default: true,
        },
        showBtnBack: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            content: false,
        };
    },
    mounted() {
        this.content = true;
    },
};
</script>

<style scoped lang="scss">
.modal {
    display: flex;
}

.modal-promo {
    position: relative;
    width: 620px;
    height: 760px;
    padding: 30px 40px;
    display: flex;
    flex-direction: column-reverse;

    &__header {
        display: none;
    }

    &__img {
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    &__text {
        text-transform: uppercase;
    }

    &__title {
        @include font(600, clamp(1rem, 0.654rem + 1.538vw, 2.5rem), 140%);
        letter-spacing: 0.01em;
        margin-bottom: 15px;
        color: $white;
    }

    &__slogan {
        @include font(600, clamp(0.625rem, 0.538rem + 0.385vw, 1rem), 140%);
        letter-spacing: 0.01em;
        color: $white;
    }

    &__promo-header {
        display: none;
    }
}

.modal-content {
    background: $white;
    padding: 30px 40px;
    max-width: 530px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    &__btn-back {
        display: flex;
        align-items: center;
        @include font(600, clamp(0.875rem, 0.817rem + 0.256vw, 1.125rem));
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $gray;

        &::before {
            content: url('@/assets/images/arrow-right-small-gray.svg');
            display: inline-block;
            transform: rotate(180deg);
            color: $gray;
            margin-right: 8px;
            transition: transform 0.2s ease-in-out;
            width: 8px;
            height: 18px;
        }

        &:hover::before {
            transform: translateX(-10px) rotate(180deg);
        }
    }

    &__btn-close {
        text-transform: uppercase;
        transition: all 0.2s ease-in-out;
    }

    &__title {
        @include font(600, clamp(1.5rem, 1.269rem + 1.026vw, 2.5rem), 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $black;
        margin-bottom: 10px;
        margin-top: 88px;
    }

    &__title-minor {
        @include font(600, clamp(1rem, 0.789rem + 0.938vw, 1.375rem), 140%);
        letter-spacing: 0.22px;
        text-transform: uppercase;
        display: block;
    }

    &__text {
        @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem), 19px);
        letter-spacing: 0.01em;
        color: $gray-dark;
        margin-bottom: 60px;
        max-width: 70%;
        min-width: min(230px, 100%);
    }

    &__text--theme-line {
        &::after {
            content: '';
            @include line(100px, 6px, $red-dark);
            display: block;
            margin-top: 20px;
        }
    }
}

@include media-query($xl) {
    .modal {
        flex-direction: column;
        width: 530px;
        height: 100%;
    }
    .modal-promo {
        width: 100%;
        height: clamp(264px, 35%, 35vh);
        justify-content: space-between;
        padding: 20px;

        &__btn-back {
            width: 20px;
            height: 20px;
            transform: rotate(180deg);
        }
        &__logo {
            height: 24px;
            padding-right: 20px;
            margin: 0 auto;
        }
        &__header {
            display: flex;
            align-items: center;
            order: 1;
        }
    }

    .modal-content {
        padding: 20px;
        height: 65%;
        &__btn-back {
            display: none;
        }
        &__title {
            margin-top: 0;
        }
        &__text {
            margin-bottom: 40px;
        }
    }

    ::v-deep {
        .modal-bg {
            height: 105% !important;
        }
        .form {
            gap: 60px;
        }
    }
}

@include media-query($md) {
    .modal-content {
        &__text {
            margin-bottom: 24px;
        }
    }
}

@include media-query($sm) {
    .modal-promo {
        padding: 16px;
    }

    .modal-content {
        padding: 16px;
    }
}

@include media-query($xs) {
    ::v-deep {
        .form {
            gap: 40px;
            &__input-text {
                gap: 12px !important;
            }
        }
    }
}

@media only screen and (height <= 1000px) {
    .modal-content {
        flex-basis: 65%;
    }
}

@media only screen and (height <= 750px) {
    .modal-promo {
        flex: 0 1 35%;
    }
    .modal-content {
        flex: 0 1 65%;
    }

    ::v-deep {
        .form {
            gap: 20px;
        }
    }
}

@include media-query(350px, 700px) {
    .modal-promo {
        display: none;
    }
    .modal-content {
        flex: 0 1 100%;
        &__btn-back {
            display: flex;
        }
        &__title {
            margin-top: 40px;
        }
    }

    ::v-deep {
        .form {
            &__checkbox-label {
                flex-wrap: wrap;
                row-gap: 5px;
            }
        }
    }
}
</style>

<style lang="scss">
@include media-query($xl) {
    .modal-bg {
        height: 100% !important;
    }
}
</style>
