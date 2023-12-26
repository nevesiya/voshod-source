<template>
    <nav class="nav">
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
                    <!-- <a
                        class="user"
                        href="#"
                    >
                        <img
                            class="user__icon"
                            :src="themeImages.user"
                            alt="user"
                        />
                    </a> -->
                    <button
                        @click="showModalCallback = true"
                        class="nav__callback-button button button--arrow-right button--color-red button--size-s"
                        href="#"
                    >
                        Заказать звонок
                    </button>
                    <Teleport to="body">
                        <transition name="fade">
                            <ModalCallback
                                v-if="showModalCallback"
                                :show-modal="showModalCallback"
                                @close-modal="showModalCallback = false"
                        /></transition>
                    </Teleport>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import logoWhite from '@/assets/images/logo-nav-white.svg'
import logoBlack from '@/assets/images/logo-nav-black.svg'
import userWhite from '@/assets/images/nav-user-white.svg'
import userBlack from '@/assets/images/nav-user-black.svg'

import ModalCallback from '@/components/UI/Modal/ModalCallback.vue'

export default {
    name: 'BaseNavigation',
    components: {
        ModalCallback
    },
    props: {
        theme: {
            type: String,
            default: 'black',
            ModalCallback
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
            ]
        }
    },
    computed: {
        themeImages() {
            let images = {}

            if (this.theme === 'white') {
                images.logo = logoWhite
                images.user = userWhite
            } else if (this.theme === 'black') {
                images.logo = logoBlack
                images.user = userBlack
            }

            return images
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.nav {
    padding: 9px 0;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: $white;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.07);

    &__box {
        @include flex-between;
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
    & input {
        width: 100%;
    }
    & textarea {
        width: 100%;
        height: 42px;
    }
}
</style>
