<template>
    <div class="card">
        <BaseSkeleton class="card__label-box" />
        <BaseSkeleton class="card__image" />
        <BaseSkeleton class="card__name" />
        <BaseSkeleton class="card__payment" />
        <BaseSkeleton class="card__book" />
    </div>
</template>

<script>
import BaseSkeleton from '@/components/UI/Skeleton/BaseSkeleton.vue'

export default {
    name: 'CardSkeleton',
    components: {
        BaseSkeleton
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    width: 335px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    &__label-box {
        margin-bottom: 54px;
        width: 100%;
        height: 50px;
    }
    &__image {
        width: 100%;
        height: 115px;
        margin-bottom: 50px;
    }
    &__name {
        width: 50%;
        height: 72px;
        margin-bottom: 20px;
    }
    &__payment {
        width: 70%;
        height: 90px;
        margin-bottom: 30px;
    }
    &__book {
        width: 100%;
        height: 44px;
    }
}
</style>
