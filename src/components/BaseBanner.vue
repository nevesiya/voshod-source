<template>
    <div class="banner">
        <lazy-load-container>
            <img
                class="banner__bg"
                v-lazy-img="bannerBackground"
                alt="banner background"
            />
        </lazy-load-container>
        <div class="banner__wrapper">
            <div class="banner__content">
                <h6 class="banner__title">{{ title }}</h6>
                <p class="banner__text">{{ text }}</p>
            </div>
            <div class="banner__box">
                <button
                    @click="clickButton"
                    class="button button--size-xs button--color-white"
                >
                    {{ button }}
                </button>
                <img
                    @click="clickButton"
                    src="@/assets/images/arrow-right-white.svg"
                    alt="arrow"
                    class="banner__box-button"
                />
            </div>
        </div>
    </div>
</template>

<script>
import bannerBackground from '@/assets/images/banner-backgound.png';

export default {
    name: 'BaseBanner',
    props: {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        button: {
            type: String,
        },
    },
    emits: ['clickButton'],
    data() {
        return {
            bannerBackground,
        };
    },
    methods: {
        clickButton() {
            this.$emit('clickButton');
        },
    },
};
</script>

<style lang="scss" scoped>
.banner {
    max-width: 1045px;

    position: relative;
    &__wrapper {
        @include flex-between();
        @include adaptive-value('padding-top', 25, 12, 0, 1400);
        @include adaptive-value('padding-bottom', 25, 12, 0, 1400);
        @include adaptive-value('padding-left', 40, 12, 0, 1400);
        @include adaptive-value('padding-right', 40, 12, 0, 1400);
    }

    &__box-button {
        display: none;
    }

    &__bg {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;
        border-radius: 4px;
        background: linear-gradient(
                228deg,
                rgba(0, 0, 0, 0.76) 27.81%,
                rgba(19, 19, 19, 0.77) 44.96%,
                rgba(19, 19, 19, 0.7) 93.65%
            ),
            linear-gradient(117deg, #000 0%, #222 83.89%);
        filter: brightness(50%);
        object-fit: cover;
    }
    &__box {
        align-self: flex-end;
    }
    &__title {
        color: $white;
        @include font(500, clamp(0.75rem, 0.635rem + 0.513vw, 1.25rem));
        letter-spacing: 0.2px;
        margin-bottom: 13px;
    }
    &__text {
        color: $white;
        @include font(600, clamp(0.875rem, 0.615rem + 1.154vw, 2rem));
        letter-spacing: 0.32px;
        text-transform: uppercase;
    }
}

@include media-query($sm) {
    .banner {
        &__box {
            .button {
                display: none;
            }
        }
        &__box-button {
            display: block;
            @include adaptive-value('width', 25, 20, 0, 576);
        }
    }
}
</style>
