<template>
    <div class="banner">
        <lazy-load-container>
            <img class="banner__bg" v-lazy-img="bannerBackground" alt="banner background" />
        </lazy-load-container>
        <div class="banner__wrapper">
            <div class="banner__content">
                <h6 class="banner__title">{{ title }}</h6>
                <p class="banner__text">{{ text }}</p>
            </div>
            <div class="banner__box">
                <button @click="clickButton" class="button button--size-xs button--color-white">
                    {{ button }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import bannerBackground from '@/assets/images/banner-backgound.png'

export default {
    name: 'BaseBanner',
    props: {
        title: {
            type: String
        },
        text: {
            type: String
        },
        button: {
            type: String
        }
    },
    emits: ['clickButton'],
    data() {
        return {
            bannerBackground
        }
    },
    methods: {
        clickButton() {
            this.$emit('clickButton')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.banner {
    width: 1045px;
    height: 126px;
    margin-bottom: 60px;
    position: relative;
    &__wrapper {
        @include flex-between();
        padding: 25px 40px;
    }

    &__bg {
        position: absolute;
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
    }
    &__box {
        align-self: flex-end;
    }
    &__title {
        color: $white;
        @include font(500, 20px);
        letter-spacing: 0.2px;
        margin-bottom: 13px;
    }
    &__text {
        color: $white;
        @include font(600, 32px);
        letter-spacing: 0.32px;
        text-transform: uppercase;
    }
}
</style>
