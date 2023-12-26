<template>
    <div class="modal-bg modal-bg--theme-blur">
        <transition name="slide-fade">
            <template v-if="content">
                <div class="modal">
                    <div class="modal-promo">
                        <img
                            src="@/assets/images/modal-image.jpg"
                            alt="photo vehicle interior"
                            class="modal-promo__img"
                        />
                        <div class="modal-promo__text">
                            <h3 class="modal-promo__title">
                                Доступные <br />
                                автомобили
                            </h3>
                            <p class="modal-promo__slogan">
                                С нами просто. <br />
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
                            <slot
                                v-if="showForm"
                                name="form"
                            ></slot>
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
@import '@/assets/styles/theme.scss';

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

    &__img {
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    &__text {
        // position: absolute;
        // bottom: 30px;
        // left: 40px;
        text-transform: uppercase;
    }

    &__title {
        @include font(600, 40px, 140%);
        letter-spacing: 0.01em;
        margin-bottom: 15px;
        color: $white;
    }

    &__slogan {
        @include font(600, 16px, 140%);
        letter-spacing: 0.01em;
        color: $white;
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
        @include font(600, 18px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $gray;

        &::before {
            content: url('@/assets/images/arrow-right-small-gray.svg');
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

    &__btn-close {
        @include font(600, 14px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $black;
        transition: all 0.2s ease-in-out;
    }

    &__title {
        @include font(600, 40px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $black;
        margin-bottom: 10px;
        margin-top: 88px;
    }

    &__title-minor {
        @include font(600, 22px, 140%);
        letter-spacing: 0.22px;
        text-transform: uppercase;
        display: block;
    }

    &__text {
        @include font(500, 16px, 19px);
        letter-spacing: 0.01em;
        color: $gray-dark;
        margin-bottom: 60px;
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
</style>
