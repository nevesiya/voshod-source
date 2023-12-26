<template>
    <div class="wrapper">
        <div class="not-found">
            <div class="not-found__error">404</div>
            <div class="not-found__text">Страница не найдена</div>
            <router-link
                to="/"
                class="button button--color-red button--size-m"
            >
                Перейти на главную
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    &__error {
        @include font(600, 30px);
        margin: 40px 0;
        color: $gray-light;
        transform: scale(5);
    }
    &__text {
        @include font(600, 30px);
        color: $red-dark;
        margin-bottom: 60px;
        opacity: 0.8;
    }
    & .button {
        &:hover {
            opacity: 1;
        }
    }
}
</style>
