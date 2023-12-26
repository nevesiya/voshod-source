<template>
    <div class="modal-bg modal-bg--theme-blur">
        <div class="modal">
            <div class="modal-slider">
                <img
                    @click="this.$emit('closeModal', indexActiveImage)"
                    src="@/assets/images/close-circle.svg"
                    alt="close"
                    class="modal-slider__btn-close"
                />
                <img :src="images[indexActiveImage]" alt="photo car" class="modal-slider__image" />
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
import BaseSlider from '@/components/UI/Slider/BaseSlider.vue'

export default {
    name: 'ModalSlider',
    components: { BaseSlider },
    props: {
        images: {
            type: Array
        },
        primaryImage: {
            type: Number
        }
    },
    emits: ['closeModal'],
    data() {
        return {
            indexActiveImage: ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.modal-slider {
    position: relative;
    max-width: 1050px;
    max-height: 750px;
    display: flex;
    justify-content: center;

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

.modal-slider ::v-deep {
    .slider-dots {
        &__item {
            width: 60px;
        }
    }
}

.modal-slider ::v-deep {
    .slider-prev {
        transform: scale(1.25) rotate(180deg);
    }
}

.modal-slider ::v-deep {
    .slider-next {
        transform: scale(1.25);
    }
}
</style>
