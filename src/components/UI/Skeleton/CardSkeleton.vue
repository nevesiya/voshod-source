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
import BaseSkeleton from '@/components/UI/Skeleton/BaseSkeleton.vue';

export default {
    name: 'CardSkeleton',
    components: {
        BaseSkeleton,
    },
};
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    @include adaptive-value('padding-left', 25, 8, 0, 1400);
    @include adaptive-value('padding-right', 30, 8, 0, 1400);
    @include adaptive-value('padding-top', 25, 8, 0, 1400);
    @include adaptive-value('padding-bottom', 30, 8, 0, 1400);
    @include adaptive-value('width', 335, 161, 0, 1400);

    &__label-box {
        @include adaptive-value('height', 50, 30, 0, 1400);
        @include adaptive-value('margin-bottom', 54, 25, 0, 1400);
        width: 100%;
    }
    &__image {
        width: 100%;
        @include adaptive-value('height', 115, 62, 0, 1400);
        @include adaptive-value('margin-bottom', 50, 20, 0, 1400);
    }
    &__name {
        width: 50%;
        @include adaptive-value('height', 72, 40, 0, 1400);
        @include adaptive-value('margin-bottom', 20, 8, 0, 1400);
    }
    &__payment {
        width: 70%;
        @include adaptive-value('height', 90, 20, 0, 1400);
        @include adaptive-value('margin-bottom', 30, 12, 0, 1400);
    }
    &__book {
        width: 100%;
        @include adaptive-value('height', 44, 20, 0, 1400);
    }
}
</style>
