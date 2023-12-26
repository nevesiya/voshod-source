<template>
    <transition name="slide-fade">
        <button
            @click="scrollTop"
            v-show="showButton"
            alt="arrow up"
            class="scroll-up"
        ></button>
    </transition>
</template>

<script>
export default {
    name: 'ScrollTopPage',
    data() {
        return {
            showButton: false,
        };
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.showButton = window.pageYOffset > 500;
        });
    },
    methods: {
        scrollTop() {
            scroll({
                top: 0,
                behavior: 'smooth',
            });
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/styles/theme.scss';

.scroll-up {
    position: fixed;
    right: 0;
    bottom: 0;
    margin-right: 50px;
    margin-bottom: 20px;
    cursor: pointer;
    padding: 12px;
    border-radius: 8px;
    background: #111;
    transition: all 0.2s ease-in-out;
    z-index: 99;

    &:after {
        content: '';
        background-image: url('@/assets/images/arrow-up.svg');
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        width: 20px;
        height: 20px;
    }

    &:hover {
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease-in-out;
    }
}
</style>
