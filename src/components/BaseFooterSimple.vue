<template>
    <footer class="footer-simple">
        <p class="footer-simple__copyright">ООО Восход ⓒ {{ currentYaer }} год</p>
        <a @click.prevent="" href="#" class="footer-simple__offer">Оферта</a>
        <router-link to="/privacy-police" class="footer-simple__privacy-police"
            >Политика конфиденциальности
        </router-link>
    </footer>
</template>

<script>
export default {
    name: 'BaseFooterSimple',
    computed: {
        currentYaer() {
            return new Date().getFullYear()
        }
    }
}
</script>

<style lang="scss">
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
