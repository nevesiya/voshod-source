<template>
    <div class="slider">
        <img
            @click="showPrevImage"
            src="@/assets/images/arrow-right-medium-white.svg"
            alt="prev image"
            class="button slider-prev"
        />
        <div class="slider-dots">
            <span
                v-for="i in imagesNumber"
                :key="i"
                :class="{
                    'slider-dots__item--active': i === indexActiveImage,
                }"
                @click="showSelectImage(i)"
                class="slider-dots__item"
            ></span>
        </div>
        <img
            @click="showNextImage"
            src="@/assets/images/arrow-right-medium-white.svg"
            alt="next image"
            class="button slider-next"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseSlider',
    props: {
        imagesNumber: {
            type: Number,
        },
        primaryIndexImage: {
            type: Number,
            default: 1,
        },
    },
    emits: ['currentIndexImage'],
    data() {
        return {
            indexActiveImage: this.primaryIndexImage,
        };
    },
    watch: {
        primaryIndexImage() {
            this.indexActiveImage = this.primaryIndexImage;
        },
    },
    methods: {
        showPrevImage() {
            if (this.indexActiveImage === 1) {
                this.indexActiveImage = this.imagesNumber + 1;
            }

            this.indexActiveImage--;
            this.$emit('currentIndexImage', this.indexActiveImage - 1);
        },

        showNextImage() {
            if (this.indexActiveImage === this.imagesNumber) {
                this.indexActiveImage = 0;
            }

            this.indexActiveImage++;
            this.$emit('currentIndexImage', this.indexActiveImage - 1);
        },

        showSelectImage(i) {
            this.indexActiveImage = i;
            this.$emit('currentIndexImage', this.indexActiveImage - 1);
        },
    },
    mounted() {
        this.$emit('currentIndexImage', this.indexActiveImage - 1);
    },
};
</script>

<style lang="scss" scoped>
.slider {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
}

.slider-dots {
    display: flex;
    gap: 10px;
    &__item {
        display: inline-block;
        width: 50px;
        height: 3px;
        background: $gray;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.25s ease-in-out;
        &:hover {
            opacity: 0.7;
        }
        &--active {
            background: $white;
        }
    }
}

.slider-prev,
.slider-next {
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 0.7;
    }
}

.slider-prev {
    transform: rotate(180deg);
}
</style>
