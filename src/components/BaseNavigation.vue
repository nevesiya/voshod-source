<template>
    <nav class="nav">
        <div class="hamburger__bg" :class="{ 'hamburger__bg--active': showMenu }"></div>
        <div class="wrapper">
            <div class="nav__box">
                <img class="logo" :src="themeImages.logo" alt="logo" />
                <div class="nav__inner">
                    <ul class="nav__menu">
                        <li class="nav__menu-item" v-for="(item, index) in menu" :key="index">
                            <router-link :to="item.path" class="nav__menu-link">
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                    <button
                        @click="showModalCallback = true"
                        class="nav__callback-button button button--arrow-right button--color-red button--size-s"
                    >
                        Заказать звонок
                    </button>
                </div>
            </div>
            <div class="nav__box-hamburger hamburger">
                <button
                    @click="showMenu = !showMenu"
                    :class="`hamburger__button-open--${theme}`"
                    class="hamburger__button-open"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img class="logo" :src="themeImages.logo" alt="logo" />
                <img
                    @click="showModalCallback = true"
                    :src="themeImages.phone"
                    class="hamburger__callback-icon"
                    alt="icon phone"
                />
                <div
                    class="nav__inner"
                    :class="{ 'nav__inner--active': showMenu, [`nav__inner--${theme}`]: true }"
                >
                    <div class="nav__inner-header">
                        <button
                            @click="showMenu = !showMenu"
                            class="hamburger__button-close"
                            :class="`hamburger__button-close--${theme}`"
                            alt="icon close"
                        ></button>
                        <img class="logo" :src="themeImages.logo" alt="logo" />
                    </div>

                    <ul class="nav__menu">
                        <li class="nav__menu-item" v-for="(item, index) in menu" :key="index">
                            <router-link
                                @click="showMenu = false"
                                :to="item.path"
                                class="nav__menu-link"
                            >
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <transition name="fade">
                <ModalCallback
                    v-if="showModalCallback"
                    :show-modal="showModalCallback"
                    @close-modal="showModalCallback = false"
            /></transition>
        </Teleport>
    </nav>
</template>

<script>
import logoWhite from '@/assets/images/logo-white.svg'
import logoBlack from '@/assets/images/logo-black.svg'
import userWhite from '@/assets/images/icon-user-white.svg'
import userBlack from '@/assets/images/icon-user-black.svg'
import phoneWhite from '@/assets/images/icon-phone-white.svg'
import phoneBlack from '@/assets/images/icon-phone-black.svg'

import ModalCallback from '@/components/UI/Modal/ModalCallback.vue'

export default {
    name: 'BaseNavigation',
    components: {
        ModalCallback
    },
    props: {
        theme: {
            type: String,
            default: 'black'
        }
    },
    data() {
        return {
            showModalCallback: false,
            menu: [
                { name: 'Главная', path: '/' },
                { name: 'Каталог', path: '/catalog' },
                { name: 'Программы', path: '/programs' },
                { name: 'Аренда', path: '/rent' },
                { name: 'Вопросы', path: '/questions' },
                { name: 'Контакты', path: '/contacts' }
            ],
            showMenu: false,
            fixedNav: false
        }
    },
    watch: {
        showMenu() {
            const body = document.querySelector('body')
            const app = document.querySelector('#app')
            let btnTop = document.querySelector('.scroll-top')

            body.style.overflow = this.showMenu ? 'hidden' : ''
            app.style.overflow = this.showMenu ? 'hidden' : ''
            btnTop.style.zIndex = this.showMenu ? 0 : ''
        }
    },
    computed: {
        themeImages() {
            let images = {}

            if (this.theme === 'white') {
                images.logo = logoWhite
                images.user = userWhite
                images.phone = phoneWhite
            } else if (this.theme === 'black') {
                images.logo = logoBlack
                images.user = userBlack
                images.phone = phoneBlack
            }

            return images
        }
    }
}
</script>

<style scoped lang="scss">
.nav {
    padding: 10px 0;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: $white;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.07);

    &__box {
        @include flex-between;
    }
    &__box-hamburger {
        display: none;
    }
    &__inner {
        @include flex-between;
        align-items: center;
        padding: 10px 0;
    }

    &__menu {
        @include flex-between;

        & * {
            transition: all 0.2s ease-in-out;
        }
        & *:hover {
            opacity: 1;
        }
    }

    &__menu-item:not(:last-child) {
        margin-right: 50px;
    }
    &__menu-item:last-child {
        margin-right: 60px;
    }

    &__menu-link {
        @include font(400, 14px, 140%);
        letter-spacing: 0.02em;
        color: $black;

        &:hover {
            color: #bf3535;
        }
    }

    &__menu-link--acitve {
        color: #bf3535;
    }

    &__callback-button {
        filter: drop-shadow(0px 0px 10px rgba(55, 73, 96, 0.25));
    }

    &__callback-icon {
        display: none;
    }
}

.user {
    padding: 8px 9px;
    margin-right: 20px;
    border: 2px solid $gray-light;
    filter: drop-shadow(0px 0px 10px rgba(55, 73, 96, 0.25));
    border-radius: 25px;

    &__icon {
        transition: all 0.4s ease-in-out;
    }

    &:hover {
        opacity: 1;

        & .user__icon {
            transform: rotate(17deg);
        }
    }
}

// Modal
:deep(.form) {
    & textarea {
        height: 42px;
    }
}

// Media queries
@include media-query($xl) {
    .nav {
        width: 100vw;
        padding: 16px 0;
        .wrapper {
            padding: 0 16px;
        }
        &__box {
            display: none;
        }
        &__menu-link {
            @include font(500, 24px, 24px);
        }
        &__menu {
            flex-direction: column;
            row-gap: 30px;
        }
        &__menu-item {
            display: flex;
            gap: 5%;
            align-items: center;
        }
        &__menu-item::before {
            content: '';
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat !important;
            transform: scale(1.5);
        }
        &__menu-item:not(:last-child) {
            margin-right: 0px;
        }
        &__menu-item:last-child {
            margin-right: 0px;
        }
        &__inner {
            display: block;
            position: fixed;
            width: 40vw;
            height: 100vh;
            margin: -16px 0 0 -16px;
            padding: 16px 22px;
            z-index: 9;
            transform: translateX(-105%);
            transition: all 0.4s ease-in-out;
            &--black {
                background: $white;
                box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.24);
                & .nav__menu .nav__menu-item {
                    &:nth-child(1)::before {
                        background: url(@/assets/images/icon-main-black.svg);
                    }
                    &:nth-child(2)::before {
                        background: url(@/assets/images/icon-catalog-black.svg);
                    }
                    &:nth-child(3)::before {
                        background: url(@/assets/images/icon-programms-black.svg);
                    }
                    &:nth-child(4)::before {
                        background: url(@/assets/images/icon-rent-black.svg);
                    }
                    &:nth-child(5)::before {
                        background: url(@/assets/images/icon-questions-black.svg);
                    }
                    &:nth-child(6)::before {
                        background: url(@/assets/images/icon-contacts-black.svg);
                    }
                }
            }
            &--white {
                background: $black;
                box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.4);

                & .nav__menu .nav__menu-item {
                    &:nth-child(1)::before {
                        background: url(@/assets/images/icon-main-white.svg);
                    }
                    &:nth-child(2)::before {
                        background: url(@/assets/images/icon-catalog-white.svg);
                    }
                    &:nth-child(3)::before {
                        background: url(@/assets/images/icon-programms-white.svg);
                    }
                    &:nth-child(4)::before {
                        background: url(@/assets/images/icon-rent-white.svg);
                    }
                    &:nth-child(5)::before {
                        background: url(@/assets/images/icon-questions-white.svg);
                    }
                    &:nth-child(6)::before {
                        background: url(@/assets/images/icon-contacts-white.svg);
                    }
                }
            }
        }
        &__inner--active {
            transform: translateX(0%);
        }
        &__inner-header {
            display: flex;
            gap: 15%;
            margin-bottom: 70px;
        }
    }
    .hamburger {
        position: relative;
        @include flex-between;
        &__bg {
            opacity: 0;
            position: fixed;
            z-index: -99;
            backdrop-filter: blur(0px);
            background: rgba(0, 0, 0, 0);
            transition: all 0.4s ease-in-out;
        }
        &__bg--active {
            opacity: 1;
            z-index: 9;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(2px);
        }
        &__button-open {
            display: flex;
            flex-direction: column;
            background-color: transparent;
            width: 40px;
            height: 40px;
            justify-content: space-around;
            align-self: center;
            & span {
                display: inline-block;
                width: 100%;
                height: 4px;
                border-radius: 5px;
            }
            &--white span {
                background-color: $white;
            }
            &--black span {
                background-color: $black;
            }
        }
        &__button-close {
            &--white::after {
                content: '';
                display: inline-block;
                background-image: url(@/assets/images/arrow-right-white.svg);
                background-repeat: no-repeat;
                width: 16px;
                height: 12px;
                transform: rotate(180deg) scale(1.8);
            }
            &--black::after {
                content: '';
                display: inline-block;
                background-image: url(@/assets/images/arrow-right-black.svg);
                background-repeat: no-repeat;
                width: 16px;
                height: 12px;
                transform: rotate(180deg) scale(1.8);
            }
        }
        &__callback-icon {
            transform: scale(1.6);
            margin-right: 8px;
        }
    }
}

@include media-query($md) {
    .nav {
        &__inner {
            width: 70vw;
        }
        &__menu-item {
            flex-basis: 100%;
            &::before {
                flex-shrink: 0;
            }
            & a {
                width: 100%;
            }
        }
    }
}

@include media-query($xs) {
    .logo {
        width: 125px;
    }
    .nav {
        &__menu {
            row-gap: 24px;
        }
        &__menu-item::before {
            transform: scale(1.2);
        }
        &__menu-link {
            @include font(500, 20px, 24px);
        }
        &__inner {
            width: 80vw;
        }
        &__inner-header {
            margin-bottom: 52px;
        }
    }
    .hamburger {
        &__callback-icon {
            transform: scale(1.2);
            margin-right: 0px;
        }
        &__button-open {
            width: 30px;
            height: 30px;
        }
        &__button-close {
            &--white::after {
                transform: rotate(180deg) scale(1.5);
            }
            &--black::after {
                transform: rotate(180deg) scale(1.5);
            }
        }
    }
}

@include media-query($xxs) {
    .logo {
        width: 100px;
    }
    .nav {
        &__menu-link {
            @include font(500, 16px, 24px);
        }
        &__menu-item {
            &::before {
                transform: scale(1);
            }
        }
    }
    .hamburger {
        &__callback-icon {
            transform: scale(1);
        }
        &__button-open {
            width: 20px;
            height: 20px;
            & span {
                height: 2px;
            }
        }
        &__button-close {
            &--white::after {
                transform: rotate(180deg) scale(1);
            }
            &--black::after {
                transform: rotate(180deg) scale(1);
            }
        }
    }
}
</style>
