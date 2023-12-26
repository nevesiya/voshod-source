<template>
    <footer class="footer-simple">
        <p class="footer-simple__copyright">ООО Восход ⓒ 2023 год</p>
        <a
            @click.prevent=""
            href="#"
            class="footer-simple__offer"
            >Оферта</a
        >
        <router-link
            to="/privacy-police"
            class="footer-simple__privacy-police"
            >Политика конфиденциальности
        </router-link>
    </footer>
</template>

<script>
export default {
    name: 'BaseFooterSimple',
};
</script>

<style lang="scss">
@import '@/assets/styles/theme.scss';

.footer-simple {
    @include flex-between();
    & * {
        color: $gray;
        @include font(400, 13px, 16px);
    }
    &__offer {
        text-decoration: underline;
    }
    &__privacy-police {
        text-decoration: underline;
    }
}
</style>
