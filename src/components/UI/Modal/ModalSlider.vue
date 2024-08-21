<template>
    <div class="modal-bg modal-bg--theme-blur">
        <div class="modal">
            <div class="modal-slider">
                <div class="modal-slider__header">
                    <img
                        @click="this.$emit('closeModal', indexActiveImage)"
                        class="modal-slider__header-close"
                        src="@/assets/images/arrow-right-white.svg"
                        alt="arrow back"
                    />
                </div>
                <img
                    @click="this.$emit('closeModal', indexActiveImage)"
                    src="@/assets/images/close-circle.svg"
                    alt="close"
                    class="modal-slider__btn-close"
                />
                <img
                    :src="images[indexActiveImage]"
                    alt="photo car"
                    class="modal-slider__image"
                />
                <BaseSlider
                    class="modal-slider__base-slider"
                    :images-number="images.length"
                    :primary-index-image="primaryImage + 1"
                    @current-index-image="indexActiveImage = $event"
                />
            </div>
        </div>
    </div>
</template>

<script>
import BaseSlider from '@/components/UI/Slider/BaseSlider.vue';
import ModalMixin from '@/mixins/ModalMixin';

export default {
    name: 'ModalSlider',
    mixins: [ModalMixin],
    components: { BaseSlider },
    props: {
        images: {
            type: Array,
        },
        primaryImage: {
            type: Number,
        },
    },
    emits: ['closeModal'],
    data() {
        return {
            indexActiveImage: '',
        };
    },
};
</script>

<style lang="scss" scoped>
.modal-slider {
    position: relative;
    max-width: 1050px;
    max-height: 750px;
    display: flex;
    justify-content: center;

    &__header {
        display: none;
    }

    &__base-slider {
        position: absolute;
        bottom: 20px;
        gap: 80px;
        justify-content: center;
    }
    &__btn-close {
        position: absolute;
        right: -10px;
        top: -10px;
        transform: scale(1.5);
        cursor: pointer;
        transition: all 0.25s ease-in-out;
        background: $black;
        border-radius: 9px;
        &:hover {
            opacity: 0.7;
        }
    }
    &__image {
        object-fit: cover;
    }
}

.modal-slider {
    ::v-deep {
        .slider-dots {
            &__item {
                width: 60px;
            }
        }
    }
}

.modal-slider {
    ::v-deep {
        .slider-prev {
            transform: scale(1.25) rotate(180deg);
        }
    }
}

.modal-slider {
    ::v-deep {
        .slider-next {
            transform: scale(1.25);
        }
    }
}

@include media-query($xl, 780px) {
    .modal-slider {
        &__btn-close {
            display: none;
        }
        &__header {
            display: block;
            position: absolute;
            left: 16px;
            top: 16px;
        }
        &__header-close {
            width: 20px;
            height: 20px;
            transform: rotate(180deg) scale(1.25);
            cursor: pointer;
        }
    }
}

@include media-query($md) {
    .modal {
        height: 100%;
        background: $white;
    }
    .modal-slider {
        min-height: 100%;
        flex-direction: column;
        &__header {
            position: relative;
            inset: 0;
            background: $white;
            padding: 18px 16px;
            flex-grow: 1;
        }
        &__header-close {
            filter: brightness(10%);
        }
        &__base-slider {
            position: relative;
            justify-content: space-between;
            flex-grow: 1;
            gap: 0;
            padding: 0 10px;
            background: $white;
        }
        &__image {
            flex-grow: 1;
            object-fit: contain;
        }

        ::v-deep {
            .slider-prev,
            .slider-next,
            .slider-dots__item--active {
                filter: brightness(10%);
            }

            .slider-prev {
                transform: rotate(180deg) scale(1.25);
            }

            .slider-next {
                transform: scale(1.25);
            }
        }
    }
}

@include media-query($xs) {
    .modal-slider {
        &__header-close {
            transform: rotate(180deg) scale(1);
        }
        ::v-deep {
            .slider-prev {
                transform: rotate(180deg) scale(1);
            }
            .slider-next {
                transform: scale(1);
            }
            .slider-prev,
            .slider-next {
                width: 40px;
            }
            .slider-dots {
                align-self: auto;
            }
            .slider-dots__item {
                width: 24px;
            }
        }
    }
}
</style>
